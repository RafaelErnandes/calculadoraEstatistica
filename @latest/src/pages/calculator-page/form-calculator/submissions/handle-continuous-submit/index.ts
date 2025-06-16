import { HandleContinuousSubmitParams } from "./types";
import { api } from "../../../../../service/calculatorServices";
import { toast } from "react-toastify";

export const HandleContinuousSubmit = async (
  params: HandleContinuousSubmitParams
) => {
  const { lines, setResult, setSubmittedData } = params;

  const payload = {
    inputTable: {
      listInputLineTable: lines.map((line) => ({
        classe: { li: line.classe.li, ls: line.classe.ls },
        fi: Number(line.fi),
        xi: line.xi,
        fac: line.fac,
      })),
    },
    average: true,
    median: true,
    mode: true,
    standardDeviation: true,
  };

  try {
    const response = await api.post(
      "/api/StatisticalCalculator/ContinuousData",
      payload
    );
    setResult(response.data);
    console.log(response.data);
    setSubmittedData({ type: "continuous" });
    toast.success("Cálculo realizado com sucesso!");
  } catch (error) {
    console.error(error);
  }
};
