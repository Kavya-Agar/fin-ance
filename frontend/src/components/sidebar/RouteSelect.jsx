import React from "react";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import { FaFish } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export const RouteSelect = () => {
    const location = useLocation();

    // Helper to check if route is active
    const isSelected = (to) => location.pathname === to;

    return (
        <div className="space-y-1">
            <SidebarRoute Icon={FiHome} selected={isSelected("/page")} title="Dashboard" to="/page" />
            <SidebarRoute Icon={FaFish} selected={isSelected("/page/fish")} title="Fish" to="/page/fish" />
            <SidebarRoute Icon={FiTrendingUp} selected={isSelected("/page/insights")} title="Insights" to="/page/insights" />
            <SidebarRoute Icon={CiLogout} selected={isSelected("/signout")} title="Sign Out" to="/signout" />
        </div>
    );
}

const SidebarRoute = ({
    selected,
    Icon,
    title,
    to,
}) => (
    <Link
        to={to}
        className={
            "flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow, _background-color, _color] " +
            (selected
                ? "bg-white text-stone-950 shadow"
                : "hover:bg-stone-200 bg-transparent text-slate-950 shadow-none")
        }
    >
        <Icon className={selected ? "text-violet-500" : ""}/>
        <span>{title}</span>
    </Link>
)
