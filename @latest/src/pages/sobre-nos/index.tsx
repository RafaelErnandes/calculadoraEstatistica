import { Header } from "../introduction-page/components/header/index.tsx";
import { LeftSideAboutUs } from "./left-side-about-us/index.tsx";
import { RightSideAboutUs } from "./right-side-about-us/index.tsx";
import { ToggleTheme } from "../../components/toggle-theme/index.tsx";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Detalhes"
        navItems={[
          { label: "Retornar", onClick: () => navigate("/") },
          { label: <ToggleTheme /> },
        ]}
      />

      <section className="bg-white dark:bg-zinc-800 py-20 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <LeftSideAboutUs />
          <RightSideAboutUs />
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-zinc-700 py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-purple-500 mb-6">
            Tecnologias Utilizadas
          </h2>
          <p className="text-gray-700 dark:text-zinc-200">
            React, TypeScript, TailwindCSS, React Router, React Hook Form,
            Context API, LocalStorage, etc.
          </p>
        </div>
      </section>

      <section className="bg-blue-600 dark:bg-purple-900 py-15 ">
        <div className="max-w-4xl mx-auto text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Funcionalidades</h2>
          <ul className="space-y-3 text-base">
            <li>✅ Cálculo de média, moda e mediana</li>
            <li>✅ Suporte a dados agrupados e não agrupados</li>
            <li>✅ Tabelas de dados para melhor entendimento</li>
            <li>✅ Modo escuro/claro com toggle</li>
            <li>✅ Armazenamento de dados com LocalStorage</li>
          </ul>
        </div>
      </section>
      <div className="text-center text-sm text-zinc-200 dark:text-zinc-400 bg-blue-600 dark:bg-purple-900 p-5 ">
        <p>Versão 1.0.0 • Última atualização: Maio 2025</p>
        <p>Contato: arthurbao10@gmail.com</p>
      </div>
    </>
  );
};
