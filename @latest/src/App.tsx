import { Header } from "./pages/introduction-page/components/header";
import { LeftSide } from "./pages/introduction-page/components/left-side/index";
import { RightSide } from "./pages/introduction-page/components/right-side";

export const App = () => {
  return (
    <>
        <Header />
        <div className="flex justify-center h-screen">
          <LeftSide />
          <RightSide />
        </div>
    </>
  );
};
