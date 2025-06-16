import { HandleNotGroupedSubmitParams } from "./types";
import { api } from "../../../../../service/calculatorServices";
import { toast } from "react-toastify";

export const HandleNotGroupedSubmit = async (
  params: HandleNotGroupedSubmitParams
) => {
  const {
    listNumber,
    setResult,
    setSubmittedData,
    average,
    median,
    mode,
    standardDeviation,
  } = params;

  const numberArray = listNumber
    .split(",")
    .map((v) => parseFloat(v.trim()))
    .filter((n) => !isNaN(n));

  try {
    const response = await api.post("/api/StatisticalCalculator/NotGrouped", {
      listNumber: numberArray,
      average,
      median,
      mode,
      standardDeviation,
    });

    setResult(response.data);
    setSubmittedData({ type: "notGrouped" });
    toast.success("Cálculo realizado com sucesso!");
  } catch (error) {
    toast.error("Erro ao calcular dados não agrupados");
    console.error(error);
  }
};
