from django.db import models

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('FOOD','Food'),
        ('TRAVEL','Travel'),
        ('ACADEMICS','Academics'),
        ('RENT','Rent'),
        ('GROCERIES','Groceries'),
        ('OTHER','Other'),
    ]

    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    date = models.DateField()

    def __str__(self):
        return f"{self.description} - ${self.amount}"