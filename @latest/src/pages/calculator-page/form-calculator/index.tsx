import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { CalculatorFormData } from "./index";
import { CheckboxButtons } from "./components/form-check-box/index.tsx";
import { ContinuousTable } from "../components/tables/continuous-table/index.tsx";
import { ErrorMessage } from "../../../components/error-message/index.tsx";
import { RadioButtons } from "./components/form-radio-box/index.tsx";
import { ToggleTheme } from "../../../components/toggle-theme/index.tsx";
import { api } from "../../../service/calculatorServices.ts";
import { toast } from "react-toastify";
import { useCalculator } from "../../../context/calculator-context/index.tsx";

export const FormCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CalculatorFormData>();

  const type = useWatch({ name: "type", control });

  const [submittedData, setSubmittedData] = useState<CalculatorFormData | null>(
    null
  );

  useEffect(() => {
    setSubmittedData(null);
  }, [type]);

  const { result, setResult } = useCalculator();

  const handleFormSubmit = async (data: CalculatorFormData) => {
    setSubmittedData(data);

    const numberArray = data.listNumber
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((n) => !isNaN(n));

    const endpoint =
      data.type === "grouped"
        ? "/api/StatisticalCalculator/Grouped"
        : data.type === "continuous"
        ? "/api/StatisticalCalculator/ContinuousData"
        : "/api/StatisticalCalculator/NotGrouped";

    try {
      const resp = await api.post(endpoint, {
        listNumber: numberArray,
        average: data.average,
        median: data.median,
        mode: data.mode,
        standardDeviation: data.standardDeviation,
      });

      setResult(resp.data);
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleContinuousCalculate = async (lines: any[]) => {
    const payload = {
      inputTable: {
        listInputLineTable: lines.map((line) => ({
          classe: { li: line.li, ls: line.ls },
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
      setSubmittedData({ type: "continuous" } as CalculatorFormData);
      toast.success("Cálculo realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao calcular, tente novamente.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center  dark:text-zinc-100">
          Calculadora de Dados
        </h1>
        <ToggleTheme />
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <RadioButtons register={register} />
          </div>
          {errors.type && <ErrorMessage>Selecione uma opção</ErrorMessage>}
        </div>
        <div className="flex gap-6 justify-center">
          <CheckboxButtons register={register} />
        </div>

        {type !== "continuous" && (
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Insira seus valores separados por vírgula"
              {...register("listNumber", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^-?\d+(\.\d+)?(,\s*-?\d+(\.\d+)?)*$/,
                  message: "Digite apenas números separados por vírgula",
                },
              })}
              className={`border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 dark:placeholder:text-zinc-100 dark:text-zinc-100 focus:border-none ${
                errors.listNumber && "border-red-500"
              }`}
            />
            {errors.listNumber && (
              <span className="text-red-600 text-sm mt-1">
                {errors.listNumber.message}
              </span>
            )}
          </div>
        )}

        {type === "continuous" ? (
          <ContinuousTable
            fi={0}
            li={0}
            ls={0}
            onCalculate={handleContinuousCalculate}
          />
        ) : (
          <button
            type="submit"
            className="bg-blue-600 dark:bg-purple-600 text-white rounded-md p-3 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
          >
            Calcular
          </button>
        )}

        {submittedData ? (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-zinc-100">
              Resumo da seleção:
            </h3>
            <ul className="text-gray-600 dark:text-zinc-200 list-disc list-inside space-y-1">
              <li>
                Tipo:
                {
                  {
                    grouped: " Agrupado",
                    notGrouped: " Não agrupado",
                    continuous: " Contínuo",
                  }[submittedData.type]
                }
              </li>

              <li>
                Moda:
                {result?.mode === null || result?.mode === undefined
                  ? "Moda amodal"
                  : result.mode?.toFixed(2)}
              </li>

              {result?.average !== undefined && (
                <li>Média: {result.average?.toFixed(2)}</li>
              )}

              {result?.median !== undefined && (
                <li>Mediana: {result.median?.toFixed(2)}</li>
              )}

              <li>
                Desvio Padrão:
                {result?.standardDeviation === 0
                  ? "Não possui"
                  : result?.standardDeviation?.toFixed(2) ?? " N/A"}
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-purple-50 border-1-4 border-blue-400 dark:border-purple-400 rounded shadow-sm">
            <h2 className="font-semibold text-blue-700 dark:text-purple-700 mb-2">
              Dicas de interpretação:
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>A média representa o valor central dos dados.</li>
              <li>O desvio padrão mostra o quanto os dados variam.</li>
              <li>Moda é o valor mais frequente - pode haver mais de uma.</li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
