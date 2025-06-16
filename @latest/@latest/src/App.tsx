import { Header } from "./pages/introduction-page/components/header/index.tsx";
import { LeftSide } from "./pages/introduction-page/components/left-side/index";
import { RightSide } from "./pages/introduction-page/components/right-side";
import { ToggleTheme } from "../src/components/toggle-theme/index.tsx";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Calculadora de Dados"
        navItems={[
          { label: "Sobre Nós", onClick: () => navigate("/sobre-nos") },
          { label: <ToggleTheme /> },
        ]}
        className="absolute"
      />

      <div className="min-h-screen flex justify-center items-center">
        <LeftSide />
        <RightSide />
      </div>
    </>
  );
};
