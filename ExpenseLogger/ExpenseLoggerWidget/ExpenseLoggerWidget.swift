//
//  ExpenseLoggerWidget.swift
//  ExpenseLoggerWidget
//
//  Created by Kavya Agar on 6/17/25.
//

import WidgetKit
import SwiftUI

struct ExpenseLoggerWidget: Widget {
    let kind: String = "ExpenseLoggerWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: StatProvider()) { entry in
            StatWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Monthly Spendings")
        .description("Shows your total spendings for the current month.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
