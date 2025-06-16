import { InputLine } from "../../../components/tables/continuous-table/continuous-table-row";
import { SelectedStats } from "../types";

export type HandleContinuousSubmitParams = {
  lines: InputLine[];
  setResult: (result: any) => void;
  setSubmittedData: (data: any) => void;
  selectedStats: SelectedStats;
};
