import React from "react";
import { FiCalendar } from "react-icons/fi";

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getFormattedDate() {
    const now = new Date();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    const month = now.toLocaleDateString('en-US', { month: 'short' });
    const day = getOrdinal(now.getDate());
    const year = now.getFullYear();
    return `${weekday}, ${month} ${day} ${year}`;
}

export const TopBar = () => {
    const formattedDate = getFormattedDate();

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">
                        🎏 Hello, Kavya!
                    </span>
                    <span className="text-xs block text-stone-500">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    );
}