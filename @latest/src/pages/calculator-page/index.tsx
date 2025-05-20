import { FormCalculator } from "./form-calculator/index.tsx";
import { TableCalculator } from "./table-calculator/index.tsx";

export const CalculatorPage = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-8 h-screen items-center">
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md dark:bg-zinc-900">
          <FormCalculator />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl mb-2 text-blue-700 dark:text-purple-700">
            Utilize a tabela para calcular os
            <span className="italic font-semibold"> Dados Contínuos</span>
          </h1>
          <span className="text-lg dark:text-zinc-100">
            Confira os dados inseridos com nossa tabela
          </span>
          <div className="flex justify-center mt-4">
            <TableCalculator />
          </div>
        </div>
      </div>
    </>
  );
};
