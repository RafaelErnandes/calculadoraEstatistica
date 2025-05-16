import { CalculatorFormData } from "./index";
import { CheckboxButtons } from "./form-check-box/index.tsx";
import { RadioButtons } from "./form-radio-box/index.tsx";
import { api } from "../../../service/calculatorServices.ts";
import { useForm } from "react-hook-form";

export const FormCalculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>();

  const handleFormSubmit = (data: CalculatorFormData) => {
    console.log(data);

    api
      .post("/api/v1/calculadora_estatistica/Median/Calculate/NotGrouped", {
        objetoParaOBack: [data.value],
      })
      .then((response) => {
        console.log("Resposta da API:", response.data);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Calculadora de Dados
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-6 justify-center">
          <RadioButtons register={register} />
        </div>

        <div className="flex gap-6 justify-center">
          <CheckboxButtons register={register} />
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
          className="bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition cursor-pointer"
        >
          Calcular
        </button>
      </form>
    </div>
  );
};
