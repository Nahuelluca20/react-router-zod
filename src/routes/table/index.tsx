import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "./types";
import { useState } from "react";
import { data as defaultData } from "./data";
import CellInput from "../../components/cell-input";
import EditCell from "../../components/edit-cell";
import { FooterCell } from "../../components/footer-cell";

export async function tableLoader() {
  // console.log("gola");
  return null;
}

export default function Table() {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});

  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      meta: {
        type: "number",
        required: true,
      },
    }),
    columnHelper.accessor("title", {
      header: "title",
      meta: {
        type: "text",
        required: true,
      },
      cell: CellInput,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      meta: {
        type: "text",
        required: true,
      },
      cell: CellInput,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      meta: {
        type: "select",
        required: true,
        options: [
          { value: "beauty", label: "beauty" },
          { value: "fragrances", label: "fragrances" },
          { value: "groceries", label: "groceries" },
          { value: "kitchen-accessories", label: "kitchen-accessories" },
        ],
      },
      cell: CellInput,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      meta: {
        type: "number",
        required: true,
      },
      cell: CellInput,
    }),
    columnHelper.accessor("discountPercentage", {
      header: "Discount Percentage",
      meta: {
        type: "number",
        required: true,
      },
      cell: CellInput,
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      meta: {
        type: "number",
        required: true,
      },
      cell: CellInput,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      cell: CellInput,
      meta: { type: "number", required: true },
    }),
    columnHelper.display({
      id: "edit",
      cell: EditCell,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow: Product = {
          id: Math.floor(Math.random() * 10000),
          title: "",
          description: "",
          category: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
        };
        const setFunc = (old: Product[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Product[]) =>
          old.filter((_row: Product, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  return (
    <div>
      <h1 className="mb-10">Table</h1>
      <table className="text-start max-w-[200px] border-2 border-red-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-start bg-red-400 py-2 px-8" key={header.id}>
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
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-8 py-2 border-b-2 border-red-200 "
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
