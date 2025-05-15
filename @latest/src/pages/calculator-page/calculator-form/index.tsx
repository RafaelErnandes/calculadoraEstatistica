import { CalculatorFormData } from "./index";
import { api } from "../../../service/calculatorServices.ts";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const CalculatorForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>();

  const [result, setResult] = useState(null);

  const handleFormSubmit = (data: CalculatorFormData) => {
    console.log(data);

    // api
    //   .post("/api/v1/calculadora_estatistica/Median/Calculate/NotGrouped", {
    //     li: [data.value],
    //   })
    //   .then((response) => {
    //     console.log("Resposta da API:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Erro na requisição:", error);
    //   });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Calculadora de Dados
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-6 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="notGrouped"
              {...register("type")}
              defaultChecked
              className="accent-blue-500"
            />
            Não Agrupado
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="grouped"
              {...register("type")}
              className="accent-blue-500"
            />
            Agrupado
          </label>
        </div>

        <div className="flex gap-6 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("media")}
              className="accent-blue-500"
            />
            Média
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("moda")}
              className="accent-blue-500"
            />
            Moda
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("mediana")}
              className="accent-blue-500"
            />
            Mediana
          </label>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Insira seus valores separados por vírgula"
            {...register("value", { required: "Campo obrigatório" })}
            className={`border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.value ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.value && (
            <span className="text-red-600 text-sm mt-1">
              {errors.value.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition"
        >
          Calcular
        </button>
      </form>

      <div className="mt-10 bg-gray-50 p-6 rounded-md shadow-inner">
        <h2 className="text-xl font-semibold mb-4">TESTE FUTURA TABELA</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>LABEL:</strong> VALOR DA TABELA
          </li>
        </ul>
      </div>
    </div>
  );
};
