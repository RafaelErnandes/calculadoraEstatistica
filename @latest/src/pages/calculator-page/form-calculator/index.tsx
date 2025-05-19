import { CalculatorFormData } from "./index";
import { CheckboxButtons } from "./form-check-box/index.tsx";
import { ErrorMessage } from "../../../components/error-message/index.tsx";
import { RadioButtons } from "./form-radio-box/index.tsx";
import { ToggleTheme } from "../../../components/toggle-theme/index.tsx";
import { api } from "../../../service/calculatorServices.ts";
import { useForm } from "react-hook-form";

export const FormCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    defaultValues: {
      type: "notGrouped",
    },
  });

  const handleFormSubmit = (data: CalculatorFormData) => {
    console.log(data);
    const numberArray = data.value
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((n) => !isNaN(n));

    console.log(numberArray);

    if (data.type === "notGrouped") {
      api
        .post("/api/v1/calculadora_estatistica/Median/Calculate/notGrouped", {
          objetoParaOBack: [data],
        })
        .then((response) => {
          console.log("Resposta da API:", response.data);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } else if (data.type === "grouped") {
      api
        .post("/api/v1/calculadora_estatistica/Median/Calculate/grouped", {
          objetoParaOBack: [data],
        })
        .then((response) => {
          console.log("Resposta da API:", response.data);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
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

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Insira seus valores separados por vírgula"
            {...register("value", {
              required: "Campo obrigatório",
              pattern: {
                value: /^-?\d+(\.\d+)?(,\s*-?\d+(\.\d+)?)*$/,
                message: "Digite apenas números separados por vírgula",
              },
            })}
            className={`border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 dark:placeholder:text-zinc-100 dark:text-zinc-100 focus:border-none ${
              errors.value && "border-red-500"
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
          className="bg-blue-600 dark:bg-purple-600 text-white rounded-md p-3 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
        >
          Calcular
        </button>
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
      </form>
    </div>
  );
};
