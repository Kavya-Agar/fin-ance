//
//  NetworkManager.swift
//  ExpenseLogger
//
//  Created by Kavya Agar on 6/17/25.
//

import Foundation

class NetworkManager {
    static let shared = NetworkManager()
    private init() {}

    func login(email: String, password: String, completion: @escaping (String?) -> Void) {
        guard let url = URL(string: "http://192.168.4.83:8000/api/login/") else { return }
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            
            let credentials = ["username": email, "password": password]
            guard let jsonData = try? JSONSerialization.data(withJSONObject: credentials) else { return }
            request.httpBody = jsonData

            URLSession.shared.dataTask(with: request) { data, response, error in
                if let data = data,
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let token = json["token"] as? String {
                    completion(token)
                } else {
                    completion(nil)
                }
            }.resume()
    }

    func submitExpense(token: String, description: String, category: String, date: Date, amount: Double, completion: (() -> Void)? = nil) {
        guard let url = URL(string: "http://192.168.4.83:8000/api/expenses/") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Token \(token)", forHTTPHeaderField: "Authorization")

        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let formattedDate = dateFormatter.string(from: date)

        let expense: [String: Any] = [
            "description": description,
            "category": category,
            "date": formattedDate,
            "amount": amount
        ]

        guard let jsonData = try? JSONSerialization.data(withJSONObject: expense) else { return }
        request.httpBody = jsonData

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data {
                    print("Response: \(String(data: data, encoding: .utf8) ?? "")")
                }
            if let error = error {
                print("Error: \(error.localizedDescription)")
            }
            completion?()
        }.resume()
    }
}
