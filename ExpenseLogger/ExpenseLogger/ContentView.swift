//
//  ContentView.swift
//  ExpenseLogger
//
//  Created by Kavya Agar on 6/17/25.
//

import SwiftUI

struct ContentView: View {
    @State private var token: String? = nil
    @State private var email = ""
    @State private var password = ""
    @State private var description = ""
    @State private var selectedCategory = "Food"
    @State private var selectedDate = Date()
    @State private var amount = ""


    var body: some View {
        VStack {
            if token == nil {
                TextField("Email", text: $email)
                    .autocapitalization(.none)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                SecureField("Password", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                Button("Login") {
                    NetworkManager.shared.login(email: email, password: password) { t in
                        DispatchQueue.main.async {
                            if let t = t {
                                self.token = t
                                let sharedDefaults = UserDefaults(suiteName: "group.com.Practice.ExpenseLogger")
                                sharedDefaults?.set(t, forKey: "authToken")
                            }
                            print("Saved token to shared defaults: \(t ?? "nil")")
                        }
                    }
                }
                .padding()
            }
            else {
                ExpenseInputView(token: token!)
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}

