import { CalculatorData } from "../context/calculator-context";
import { api } from "./calculatorServices";

export const StatisticalCalculatorService = {
  async calculateGrouped(
    listNumber: number[],
    options: { average: boolean; median: boolean; mode: boolean }
  ): Promise<CalculatorData> {
    const response = await api.post("/api/StatisticalCalculator/Grouped", {
      listNumber,
      ...options,
    });
    return response.data;
  },

  async calculateNotGrouped(
    listNumber: number[],
    options: { average: boolean; median: boolean; mode: boolean }
  ): Promise<CalculatorData> {
    const response = await api.post("/api/StatisticalCalculator/NotGrouped", {
      listNumber,
      ...options,
    });
    return response.data;
  },

  async calculateContinuous(payload: {
    listLineTable: {
      classe: { li: number; ls: number };
      fi: number;
    }[];
  }): Promise<CalculatorData> {
    const response = await api.post(
      "/api/StatisticalCalculator/Continuous",
      payload
    );
    return response.data;
  },
};
