import { FormCalculator } from "./form-calculator/index.tsx";
import { TableCalculator } from "./table-calculator/index.tsx";

export const CalculatorPage = () => {
  return (
    <div className="flex flex-col">
      <div className=" m-8 p-8 bg-white rounded-lg shadow-md ">
        <FormCalculator />
      </div>
      <div className="m-8">
        <h1 className="text-3xl">Veja o resultado da conta em uma tabela!</h1>
        <span className="text-lg">
          Confira os dados inseridos com nossa tabela
        </span>
        <div className="flex justify-center">
          <TableCalculator />
        </div>
      </div>
    </div>
  );
};
