import React, { useState, useEffect } from "react";
import InputGrid from "./TransactionInputs.jsx"; 

export default function SubmitTransaction() {
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const clearForm = () => {
    setDescription("");
    setSelectedCategory("");
    setSelectedDate("");
    setAmount("");
  };

  const submitTransaction = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/api/expenses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        description,
        category: selectedCategory,
        date: selectedDate,
        amount: parseFloat(amount),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setExpenses(prev => [data, ...prev]);
      clearForm();
    } else {
      console.error("Error saving transaction:", data);
    }
  };

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/api/expenses/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <InputGrid
        description={description}
        setDescription={setDescription}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        amount={amount}
        setAmount={setAmount}
      />
      <div className="nav-actions hidden md:flex mt-4">
        <button
          type="button"
          onClick={submitTransaction}
          className="action-btn black flex items-center justify-center bg-orange-100 border-stone-300 rounded"
          style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          🎣 Save
        </button>
      </div>
    </div>
  );
}
