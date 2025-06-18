//
//  StatWidgetEntryView.swift
//  ExpenseLogger
//
//  Created by Kavya Agar on 6/17/25.
//

import SwiftUI

struct StatWidgetEntryView: View {
    var entry: StatEntry

    var body: some View {
        VStack(alignment: .center, spacing: 8) {
            Text("Total Spendings")
                .font(.caption)
                .foregroundColor(.secondary)
            Text("$\(entry.thisMonth, specifier: "%.2f")")
                .font(.custom("Poppins-Bold", size: 20))
                .fontWeight(.bold)
                .foregroundColor(.primary)
            Text(currentMonthLabel())
                .font(.footnote)
                .foregroundColor(.secondary)
        }
        .padding()
    }

    func currentMonthLabel() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "LLLL yyyy"
        return formatter.string(from: Date())
    }
}
