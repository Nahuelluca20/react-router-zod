import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../routes/table/types";
import { Column, Row, Table } from "@tanstack/react-table";

type Option = {
  label: string;
  value: string;
};

export default function CellInput({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => any;
  row: Row<Product>;
  column: Column<Product>;
  table: Table<Product>;
}) {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[Number(row.id)]) {
    return columnMeta?.type === "select" ? (
      <select
        className="max-w-[100px] invalid:border-red-500"
        onChange={onSelectChange}
        value={initialValue}
        required={columnMeta?.required}
      >
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        className="max-w-[100px] invalid:border-red-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
        required={columnMeta?.required}
      />
    );
  }

  return (
    <span className="w-full flex min-w-[100px] text-ellipsis line-clamp-2 max-h-[100px]">
      {value}
    </span>
  );
}
