import { Line } from "../../../components/tables/grouped-table";
import { SelectedStats } from "../types";

export type HandleGroupedSubmitParams = {
  lines: Line[];
  setResult: (result: any) => void;
  setSubmittedData: (data: any) => void;
  selectedStats: SelectedStats;
};
