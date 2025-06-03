import React from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

export const RecentTransactions = () => {
    return(
        <div className="col-span-12 p-4 rounded border border-stone-300">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiDollarSign /> Recent Transactions
                </h3>
                <button className="text-sm text-violet-500 hover:underline">
                    See all
                </button>
            </div>
            <table className="w-full table-auto">
                <TableHead />

                <tbody>
                    <TableRow 
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        order={1}
                    />
                    <TableRow 
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        order={2}
                    />
                    <TableRow
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        order={3}
                    />
                    <TableRow 
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        order={4}
                    />
                    <TableRow 
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        order={5}
                    />
                </tbody>
            </table>
        </div>
    );
};

const TableHead = () => {
    return (
        <thead>
            <tr className="text-sm font-normal text-stone-500">
                <th className="text-start p-1.5">Customer ID</th>
                <th className="text-start p-1.5">SKU</th>
                <th className="text-start p-1.5">Date</th>
                <th className="text-start p-1.5">Price</th>
                <th className="w-8"></th>
            </tr>
        </thead>
    );
}

const TableRow = ({ cusId, sku, date, price, order }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
            <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};