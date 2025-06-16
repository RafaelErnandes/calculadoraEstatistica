import { Plus, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@mui/material";

import { ContinuousTableRowProps } from ".";
import { Controller } from "react-hook-form";

export const ContinuousTableRow = (props: ContinuousTableRowProps) => {
  const {
    control,
    fieldId,
    firstLi,
    firstLs,
    index,
    lines,
    onAddLine,
    onFirstLiChange,
    onFirstLsChange,
    onRemoveLine,
  } = props;

  const isFirst = index === 0;
  const isLast = index === lines.length - 1;

  return (
    <TableRow key={fieldId}>
      <TableCell>
        <div className="flex gap-2">
          {isFirst ? (
            <>
              <input
                type="number"
                style={{ width: "50%" }}
                className="border-b text-center"
                value={firstLi}
                onChange={(e) => onFirstLiChange(Number(e.target.value))}
              />
              -
              <input
                type="number"
                style={{ width: "50%" }}
                className="border-b text-center"
                value={firstLs}
                onChange={(e) => onFirstLsChange(Number(e.target.value))}
              />
            </>
          ) : (
            <>
              <span
                style={{
                  width: "50%",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                {lines[index].classe.li}
              </span>
              -
              <span
                style={{
                  width: "50%",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                {lines[index].classe.ls}
              </span>
            </>
          )}
        </div>
      </TableCell>

      <TableCell align="center">
        <span>{lines[index].xi}</span>
      </TableCell>

      <TableCell align="center">
        <Controller
          name={`lines.${index}.fi`}
          control={control}
          render={({ field }) => (
            <input
              type="number"
              style={{ width: "50px" }}
              className="border-b text-center"
              {...field}
              onFocus={(e) => {
                if (e.target.value === "0") {
                  field.onChange("");
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  field.onChange(0);
                }
              }}
            />
          )}
        />
      </TableCell>

      <TableCell align="center">
        <span>{lines[index].fac}</span>
      </TableCell>

      <TableCell align="center">
        <div className="flex items-center justify-center gap-2">
          {isLast && (
            <button
              type="button"
              onClick={onAddLine}
              className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
              rounded-full p-2 hover:bg-blue-200 dark:hover:bg-blue-800 
              shadow-sm transition-all cursor-pointer"
            >
              <Plus size={18} />
            </button>
          )}
          {!isFirst && (
            <button
              type="button"
              onClick={() => onRemoveLine(index)}
              className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
              rounded-full p-2 hover:bg-red-200 dark:hover:bg-red-800 
              shadow-sm transition-all cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
