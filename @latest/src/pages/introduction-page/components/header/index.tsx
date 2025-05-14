export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-8 flex items-center justify-between shadow-lg ">
      <h1 className="text-2xl font-bold">Calculadora de Dados</h1>

      <nav>
        <ul className="flex  text-sm font-medium gap-6">
          <li className="hover:underline cursor-pointer">Sobre Nós</li>
          <li className="hover:underline cursor-pointer">???</li>
        </ul>
      </nav>
    </header>
  );
};
