import { useNavigate } from "react-router-dom";

export const LeftSide = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/calculadora");
  };

  return (
    <div className="w-1/2 p-10 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-purple-500">
        Calcule Dados Estatísticos com Facilidade
      </h1>

      <p className="mt-4 text-gray-700 dark:text-zinc-100 text-lg">
        Faça cálculos de dados <span className="font-bold">discretos </span>
        (agrupados e não agrupados) e também de
        <span className="font-bold"> dados contínuos</span>. Obtenha valores
        como
        <span className="italic"> média</span>,
        <span className="italic"> mediana</span>,
        <span className="italic"> moda</span> e muito mais!
      </p>

      <ul className="mt-6 space-y-2 text-gray-600 dark:text-zinc-100">
        <li>📊 Discretos (não agrupados): Lista de valores simples</li>
        <li>📈 Discretos (agrupados): Valores com frequências</li>
        <li>📉 Contínuos: Classes com intervalos</li>
      </ul>

      <button
        className="mt-8 w-fit px-6 py-3 bg-blue-600 dark:bg-purple-600 text-white font-semibold rounded hover:bg-blue-700 hover:dark:bg-purple-700 transition cursor-pointer"
        onClick={handleNextPage}
      >
        Começar agora
      </button>

      <p className="mt-8 italic text-gray-500 dark:text-zinc-100">
        Feito por Rafael Siqueira e Arthur Bomfim. – Fatec Garça
      </p>
    </div>
  );
};
