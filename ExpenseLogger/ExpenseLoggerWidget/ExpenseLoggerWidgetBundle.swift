//
//  ExpenseLoggerWidgetBundle.swift
//  ExpenseLoggerWidget
//
//  Created by Kavya Agar on 6/17/25.
//

import WidgetKit
import SwiftUI

@main
struct ExpenseLoggerWidgetBundle: WidgetBundle {
    var body: some Widget {
        ExpenseLoggerWidget()
        ExpenseLoggerWidgetControl()
        ExpenseLoggerWidgetLiveActivity()
    }
}
