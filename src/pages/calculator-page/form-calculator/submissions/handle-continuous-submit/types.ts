import { InputLine } from "../../../components/tables/continuous-table/index";
import { SelectedStats } from "../types";

export type HandleContinuousSubmitParams = {
  lines: InputLine[];
  setResult: (result: any) => void;
  setSubmittedData: (data: any) => void;
  selectedStats: SelectedStats;
};
