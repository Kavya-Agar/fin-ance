//
//  StatProvider.swift
//  ExpenseLogger
//
//  Created by Kavya Agar on 6/17/25.
//

import WidgetKit

struct StatProvider: TimelineProvider {
    func placeholder(in context: Context) -> StatEntry {
        StatEntry(date: Date(), thisMonth: 0)
    }
    
    func getSnapshot(in context: Context, completion: @escaping (StatEntry) -> Void) {
        completion(StatEntry(date: Date(), thisMonth: 0))
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<StatEntry>) -> Void) {
        fetchStats { thisMonth in
            let entry = StatEntry(date: Date(), thisMonth: thisMonth)
            let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())!
            completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
        }
    }
    
    func fetchStats(completion: @escaping (Double) -> Void) {
        guard let url = URL(string: "http://192.168.4.83:8000/api/expenses/stats/") else {
            completion(0)
            return
        }
        let sharedDefaults = UserDefaults(suiteName: "group.com.Practice.ExpenseLogger")
        if let token = sharedDefaults?.string(forKey: "authToken") {
            var request = URLRequest(url: url)
            request.setValue("Token \(token)", forHTTPHeaderField: "Authorization")
            URLSession.shared.dataTask(with: request) { data, _, _ in
                if let data = data,
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let thisMonth = json["this_month"] as? Double {
                    completion(thisMonth)
                } else {
                    completion(0)
                }
            }.resume()
        } else {
            completion(0)
        }
        let token = sharedDefaults?.string(forKey: "authToken")
        print("Widget read token: \(token ?? "nil")")
    }
}
