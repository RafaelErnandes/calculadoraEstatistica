export type HandleNotGroupedSubmitParams = {
  listNumber: string;
  average?: boolean;
  mode?: boolean;
  median?: boolean;
  standardDeviation?: boolean;
  setResult: (result: any) => void;
  setSubmittedData: (data: any) => void;
};
