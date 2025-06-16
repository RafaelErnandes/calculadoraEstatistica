import { CalculatorFormData, FormCalculatorProps } from "./index.ts";
import { ChartBar, ChartLine, Database, Grid2X2Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { CheckboxButtons } from "./components/form-check-box/index.tsx";
import { ContinuousTable } from "../components/tables/continuous-table/index.tsx";
import { ContinuousTableResult } from "../components/tables/continuous-table-result/index.tsx";
import { ErrorMessage } from "../../../components/error-message/index.tsx";
import { GroupedTable } from "../components/tables/grouped-table/index.tsx";
import { HandleContinuousSubmit } from "./submissions/handle-continuous-submit/index.ts";
import { HandleNotGroupedSubmit } from "./submissions/handle-not-grouped-submit/index.ts";
import { InputLine } from "../components/tables/continuous-table/index.ts";
import { RadioButtons } from "./components/form-radio-box/index.tsx";
import { ToggleTheme } from "../../../components/toggle-theme/index.tsx";
import { handleGroupedSubmit } from "./submissions/handle-grouped-submit/index.ts";
import { useCalculator } from "../../../context/calculator-context/index.tsx";

export const FormCalculator = (props: FormCalculatorProps) => {
  const { onSubmitSuccess } = props;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CalculatorFormData>();

  const type = useWatch({ name: "type", control });

  const watchAverage = watch("average");
  const watchMedian = watch("median");
  const watchMode = watch("mode");
  const watchStandardDeviation = watch("standardDeviation");

  const selectedStats = {
    average: !!watchAverage,
    median: !!watchMedian,
    mode: !!watchMode,
    standardDeviation: !!watchStandardDeviation,
  };

  const [submittedData, setSubmittedData] = useState<CalculatorFormData | null>(
    null
  );

  useEffect(() => {
    setSubmittedData(null);
  }, [type]);

  const { result, setResult } = useCalculator();

  const handleContinuousCalculate = async (lines: InputLine[]) => {
    await HandleContinuousSubmit({
      lines,
      setResult,
      setSubmittedData,
      selectedStats,
    });
  };

  const handleGroupedCalculate = async (
    lines: { xi: number; fi: number }[]
  ) => {
    await handleGroupedSubmit({
      lines,
      setResult,
      setSubmittedData,
      selectedStats,
    });
  };

  const handleNotGroupedCalculate = async (data: CalculatorFormData) => {
    if (data.type === "notGrouped") {
      await HandleNotGroupedSubmit({
        listNumber: data.listNumber,
        average: data.average,
        median: data.median,
        mode: data.mode,
        standardDeviation: data.standardDeviation,
        setResult,
        setSubmittedData,
      });
    }

    onSubmitSuccess?.();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl flex flex-row gap-3 font-bold text-blue-700 dark:text-purple-500 mb-8">
        Calculadora de Estatística 📊
        <ToggleTheme />
      </h1>

      <div className="w-full grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow space-y-4">
          <h2 className="text-xl flex gap-2 items-center font-semibold text-blue-700 dark:text-purple-500 border-b-1 dark:border-zinc-600 pb-2">
            <Database />
            Tipo de dados
          </h2>
          <RadioButtons register={register} watch={watch} />
          {errors.type && <ErrorMessage>Selecione uma opção</ErrorMessage>}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow space-y-4">
          <h2 className="text-xl flex gap-2 items-center font-semibold text-blue-700 dark:text-purple-500 border-b-1 dark:border-zinc-600 pb-2">
            <ChartBar />
            Estatísticas
          </h2>
          <CheckboxButtons register={register} watch={watch} />
        </div>
      </div>

      <div className="w-full mb-8 bg-white dark:bg-zinc-800 rounded-lg shadow">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl flex gap-2 items-center font-semibold text-blue-700 dark:text-purple-500 border-b-1 dark:border-zinc-600 pb-2">
            <Grid2X2Check />
            Dados
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(handleNotGroupedCalculate)}
          className="w-full p-2 mb-4 "
        >
          <div className="lg:col-span-2 space-y-4 w-full flex flex-col">
            {type !== "continuous" && type !== "grouped" ? (
              <div className="flex flex-col p-4 w-full">
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
                  className={`border mb-4 w-full rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 dark:placeholder:text-zinc-100 dark:text-zinc-100 focus:border-none ${
                    errors.listNumber && "border-red-500"
                  }`}
                />
                {errors.listNumber && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors.listNumber.message}
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-purple-600 text-white w-full rounded-md p-2 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
                >
                  Calcular
                </button>
              </div>
            ) : type === "continuous" ? (
              <div className="w-full">
                <ContinuousTable
                  fi={0}
                  li={0}
                  ls={0}
                  onCalculate={handleContinuousCalculate}
                />
              </div>
            ) : (
              <div className="w-full">
                <GroupedTable
                  lines={[{ xi: 0, fi: 0 }]}
                  average={0}
                  onCalculate={handleGroupedCalculate}
                  index={1}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="w-full mb-8 bg-white dark:bg-zinc-800 rounded-lg shadow">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl flex gap-2 items-center font-semibold text-blue-700 dark:text-purple-500 border-b dark:border-zinc-600 pb-2">
            <ChartLine />
            Resultados
          </h2>
        </div>

        <div className="p-4 space-y-4">
          {submittedData && (
            <>
              <div className="grid grid-cols-4 gap-4">
                <div className="border-t-4 border-blue-700 dark:border-purple-500 bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow flex flex-col items-center gap-2">
                  <p className="text-md font-medium text-gray-600 dark:text-zinc-300">
                    Média
                  </p>
                  <p className="text-lg font-semibold text-blue-700 dark:text-purple-500">
                    {!selectedStats.average || result?.average == null
                      ? "N/A"
                      : result.average.toFixed(2)}
                  </p>
                </div>
                <div className="border-t-4 border-blue-700 dark:border-purple-500 bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow flex flex-col items-center gap-2">
                  <p className="text-md font-medium text-gray-600 dark:text-zinc-300">
                    Moda
                  </p>
                  <p className="text-lg font-semibold text-blue-700 dark:text-purple-500">
                    {!selectedStats.mode
                      ? "N/A"
                      : result?.mode === null || result?.mode === undefined
                      ? "Moda amodal"
                      : result.mode}
                  </p>
                </div>

                <div className="border-t-4 border-blue-700 dark:border-purple-500 bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow flex flex-col items-center gap-2">
                  <p className="text-md font-medium text-gray-600 dark:text-zinc-300">
                    Mediana
                  </p>
                  <p className="text-lg font-semibold text-blue-700 dark:text-purple-500">
                    {!selectedStats.median || result?.median == null
                      ? "N/A"
                      : result.median.toFixed(2)}
                  </p>
                </div>

                <div className="border-t-4 border-blue-700 dark:border-purple-500 bg-gray-100 dark:bg-zinc-700 p-4 rounded-lg shadow flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-zinc-300">
                    Desvio Padrão
                  </p>
                  <p className="text-lg font-semibold text-blue-700 dark:text-purple-500">
                    {!selectedStats.standardDeviation ||
                    result?.standardDeviation == null
                      ? "N/A"
                      : result.standardDeviation === 0
                      ? "Não possui"
                      : result.standardDeviation.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <ContinuousTableResult />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
