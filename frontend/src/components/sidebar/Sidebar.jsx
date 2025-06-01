import React from "react";
import fishSeafoodIconFreeVectorBackgroundRemoved1 from "../../assets/fish-seafood-icon-free-vector Background Removed.png";
import { AccountsToggle } from "./AccountsToggle";
import { Search } from "./Search";

export default function Sidebar() {
  return (
    <div>
      <div className="overflow sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountsToggle />
        <Search />
      </div>
    </div>
  );
}