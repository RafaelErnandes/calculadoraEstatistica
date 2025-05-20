import { CalculatorFormData } from "./index";
import { CheckboxButtons } from "./form-check-box/index.tsx";
import { ErrorMessage } from "../../../components/error-message/index.tsx";
import { RadioButtons } from "./form-radio-box/index.tsx";
import { ToggleTheme } from "../../../components/toggle-theme/index.tsx";
import { api } from "../../../service/calculatorServices.ts";
import { useCalculator } from "../../../context/calculator-context/index.tsx";
import { useForm } from "react-hook-form";
import { useState } from "react";

// import { TableCalculator } from "../table-calculator/index.tsx";

export const FormCalculator = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>();

  const [submittedData, setSubmittedData] = useState<CalculatorFormData | null>(
    null
  );

  const { result, setResult } = useCalculator();

  const handleFormSubmit = (data: CalculatorFormData) => {
    setSubmittedData(data);

    const numberArray = data.listNumber
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((n) => !isNaN(n));

    const endpoint =
      data.type === "grouped"
        ? "/api/StatisticalCalculator/Grouped"
        : "/api/StatisticalCalculator/NotGrouped";

    api
      .post(endpoint, {
        listNumber: numberArray,
        average: data.average,
        median: data.median,
        mode: data.mode,
      })
      .then((resp) => {
        console.log("OK:", resp.data);
        setResult(resp.data);
      })
      .catch((err) => console.error("Erro:", err));
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
        {watch("type") !== "continuous" && (
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
        {/* {watch("type") === "continuous" && <TableCalculator />} */}
        <button
          type="submit"
          className="bg-blue-600 dark:bg-purple-600 text-white rounded-md p-3 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
        >
          Calcular
        </button>
        {submittedData && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-zinc-100">
              Resumo da seleção:
            </h3>
            <ul className="text-gray-600 dark:text-zinc-200 list-disc list-inside space-y-1">
              <li>
                Tipo:{" "}
                {submittedData.type === "grouped"
                  ? "Agrupado"
                  : submittedData.type === "notGrouped"
                  ? "Não agrupado"
                  : "Contínuo"}
              </li>
              {result?.mode && <li>Moda: {result.mode}</li>}
              {result?.average && <li>Média: {result.average}</li>}
              {result?.median && <li>Mediana: {result.median}</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
