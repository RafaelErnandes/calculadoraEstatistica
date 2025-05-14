export const LeftSide = () => {
  return (
    <div className="w-1/2 p-10 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-blue-700">
        Calcule Dados Estatísticos com Facilidade
      </h1>

      <p className="mt-4 text-gray-700 text-lg">
        Faça cálculos de dados <strong>discretos</strong> (agrupados e não
        agrupados) e também de <strong>dados contínuos</strong>. Obtenha valores
        como <em>média</em>, <em>mediana</em>, <em>moda</em> e muito mais!
      </p>

      <ul className="mt-6 space-y-2 text-gray-600">
        <li>📊 Discretos (não agrupados): Lista de valores simples</li>
        <li>📈 Discretos (agrupados): Valores com frequências</li>
        <li>📉 Contínuos: Classes com intervalos</li>
      </ul>

      <button className="mt-8 w-fit px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition cursor-pointer">
        Começar agora
      </button>

      {/* <p className="mt-8 italic text-gray-500">
        “A estatística é a gramática da ciência.” – Karl Pearson
      </p> */}
    </div>
  );
};
