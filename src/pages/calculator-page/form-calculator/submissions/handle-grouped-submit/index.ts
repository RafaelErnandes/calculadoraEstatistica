import { HandleGroupedSubmitParams } from "./types";
import { api } from "../../../../../service/calculatorServices";
import { toast } from "react-toastify";

export const handleGroupedSubmit = async (
  params: HandleGroupedSubmitParams
) => {
  const { lines, setResult, setSubmittedData, selectedStats } = params;

  const payload = {
    inputGroupedTable: {
      listGroupedLineTable: lines.map((line) => ({
        xi: line.xi,
        fi: line.fi,
      })),
    },
    average: selectedStats.average,
    median: selectedStats.median,
    mode: selectedStats.mode,
    standardDeviation: selectedStats.standardDeviation,
  };

  try {
    const response = await api.post(
      "/api/StatisticalCalculator/Grouped",
      payload
    );
    setResult(response.data);
    setSubmittedData({ type: "grouped" });
    toast.success("Cálculo realizado com sucesso!");
  } catch (error) {
    toast.error("Erro ao calcular dados agrupados.");
    console.error(error);
  }
};
