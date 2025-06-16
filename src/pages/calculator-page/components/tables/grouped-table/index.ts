export type Line = {
  xi: number;
  fi: number;
};

export type GroupedTableProps = {
  lines: Line[];
  onCalculate: (lines: Line[]) => void;
  average: number | null;
  index: number;
};

export type FormValues = {
  lines: Line[];
};
