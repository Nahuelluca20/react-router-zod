import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "./types";
import { useState } from "react";
import { data as defaultData } from "./data";

export async function tableLoader() {
  // console.log("gola");
  return null;
}

export default function Table() {
  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("title", { header: "title" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("price", { header: "Price" }),
    columnHelper.accessor("discountPercentage", {
      header: "Discount Percentage",
    }),
    columnHelper.accessor("rating", { header: "Rating" }),
    columnHelper.accessor("stock", { header: "Stock" }),
  ];
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className="mb-10">Table</h1>
      <table className="text-start">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-start bg-red-400 px-8" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-8 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
