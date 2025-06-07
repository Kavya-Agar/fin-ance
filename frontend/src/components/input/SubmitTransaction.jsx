import React, { useState } from "react";
import InputGrid from "./TransactionInputs.jsx";

export default function SubmitTransaction({ onSubmit }) {
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [amount, setAmount] = useState("");

    const clearForm = () => {
        setDescription("");
        setSelectedCategory("");
        setSelectedDate("");
        setAmount("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            description,
            category: selectedCategory,
            date: selectedDate,
            amount: parseFloat(amount),
        };
        await onSubmit(formData);
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    type="submit"
                    className="action-btn black flex items-center justify-center bg-orange-100 border-stone-300 rounded"
                    style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    🎣 Save
                </button>
            </div>
        </form>
    );
}
