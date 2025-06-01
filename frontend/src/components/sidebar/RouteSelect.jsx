import React from "react";
import { FiDollarSign, FiHome, FiLink, FiPaperclip, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export const RouteSelect = () => {
    return (
        <div className="space-y-1">
            <SidebarRoute Icon={FiHome} selected={true} title="Dashboard" to="/page" />
            <SidebarRoute Icon={FiUsers} selected={false} title="Team" to="/page/team" />
            <SidebarRoute Icon={FiPaperclip} selected={false} title="Invoice" to="/page/invoice" />
            <SidebarRoute Icon={FiLink} selected={false} title="Integration" to="/page/integration" />
            <SidebarRoute Icon={FiDollarSign} selected={false} title="Finances" to="/page/finances" />
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
                : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none")
        }
    >
        <Icon className={selected ? "text-violet-500" : ""}/>
        <span>{title}</span>
    </Link>
);
