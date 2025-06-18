from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Expense
from .serializers import ExpenseSerializer
from django.utils import timezone
from datetime import timedelta
from django.db import models
from django.db.models import Sum
import calendar
from rest_framework.permissions import AllowAny

class ExpenseListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        expenses = Expense.objects.filter(user=request.user).order_by('-date')
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExpenseSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=400)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)

from rest_framework.permissions import AllowAny

class ExpenseStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if not request.user.is_authenticated:
            # Return demo or public data, or zeros
            total = Expense.objects.aggregate(total=models.Sum('amount'))['total'] or 0
            this_month = Expense.objects.filter(
                date__gte=timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            ).aggregate(total=models.Sum('amount'))['total'] or 0
            last_month = 0  # Or calculate for all users if you want
            return Response({
                "total": total,
                "this_month": this_month,
                "last_month": last_month,
            })

        # Existing logic for authenticated users
        user = request.user
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        first_of_this_month = start_of_month
        start_of_last_month = (first_of_this_month - timedelta(days=1)).replace(day=1)
        end_of_last_month = first_of_this_month - timedelta(seconds=1)
        total = Expense.objects.filter(user=user).aggregate(total=models.Sum('amount'))['total'] or 0
        this_month = Expense.objects.filter(user=user, date__gte=start_of_month).aggregate(total=models.Sum('amount'))['total'] or 0
        last_month = Expense.objects.filter(
            user=user, date__gte=start_of_last_month, date__lte=end_of_last_month
        ).aggregate(total=models.Sum('amount'))['total'] or 0

        return Response({
            "total": total,
            "this_month": this_month,
            "last_month": last_month,
        })


class ExpenseMonthlyChartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()
        months = []
        for i in range(5, -1, -1):  # Last 6 months, oldest first
            month = (now.month - i - 1) % 12 + 1
            year = now.year if now.month - i > 0 else now.year - 1
            months.append((year, month))
        data = []
        for year, month in months:
            start = timezone.datetime(year, month, 1, tzinfo=timezone.utc)
            if month == 12:
                end = timezone.datetime(year + 1, 1, 1, tzinfo=timezone.utc)
            else:
                end = timezone.datetime(year, month + 1, 1, tzinfo=timezone.utc)
            total = Expense.objects.filter(
                user=user, date__gte=start, date__lt=end
            ).aggregate(total=Sum('amount'))['total'] or 0
            data.append({
                "name": f"{calendar.month_abbr[month]} {year}",
                "Spendings": float(total)
            })
        return Response(data)

class MonthlyCategoryDistributionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        expenses = (
            Expense.objects
            .filter(user=user, date__gte=start_of_month)
            .values('category')
            .annotate(amount=Sum('amount'))
            .order_by('category')
        )
        # Format for frontend
        data = [{"feature": e["category"], "amount": float(e["amount"])} for e in expenses]
        return Response(data)