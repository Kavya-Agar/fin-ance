//
//  ExpenseInputView.swift
//  ExpenseLogger
//
//  Created by Kavya Agar on 6/17/25.
//

import SwiftUI
import WidgetKit

struct ExpenseInputView: View {
    let token: String
    @State private var description = ""
    @State private var selectedCategory = "Food"
    @State private var selectedDate = Date()
    @State private var amount = ""
    @State private var showingSuccess = false
    
    let categories = ["Food", "Travel", "Academics", "Rent", "Groceries", "Other"]
    
    var body: some View {
        Form {
            Section(header: Text("Description")) {
                TextField("Enter description", text: $description)
            }
            Section(header: Text("Select Category")) {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(categories, id: \.self) { category in
                            Button(action: {
                                selectedCategory = category
                            }) {
                                Text(category)
                                    .padding(8)
                                    .background(selectedCategory == category ? Color.orange.opacity(0.4) : Color.gray.opacity(0.1))
                                    .cornerRadius(10)
                            }
                        }
                    }
                }
            }
            Section(header: Text("Date")) {
                DatePicker("Select Date", selection: $selectedDate, displayedComponents: .date)
            }
            Section(header: Text("Amount")) {
                HStack {
                    Image(systemName: "dollarsign.circle")
                    TextField("0.00", text: $amount)
                        .keyboardType(.decimalPad)
                }
            }
            Section {
                HStack {
                    Spacer()
                    Button(action: {
                        submitExpense()
                    }) {
                        Text("Submit")
                            .frame(maxWidth: .infinity, alignment: .center)
                    }
                    Spacer()
                }
            }
        }
        .alert(isPresented: $showingSuccess) {
            Alert(
                title: Text("Success"),
                message: Text("Expense submitted!"),
                dismissButton: .default(Text("OK")) {
                    // Reset form after dismiss
                    description = ""
                    selectedCategory = "Food"
                    selectedDate = Date()
                    amount = ""
                }
            )
        }
    }
    
    func submitExpense() {
        NetworkManager.shared.submitExpense(
            token: token,
            description: description,
            category: selectedCategory,
            date: selectedDate,
            amount: Double(amount) ?? 0.0
        ) {
            // This closure runs after the network call completes (see below)
            DispatchQueue.main.async {
                WidgetCenter.shared.reloadAllTimelines()
                showingSuccess = true
            }
        }
    }
}
