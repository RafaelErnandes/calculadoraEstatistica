import { Header } from "./pages/introduction-page/components/header";
import { LeftSide } from "./pages/introduction-page/components/left-side/index";
import { RightSide } from "./pages/introduction-page/components/right-side";

export const App = () => {
  return (
    <>
      <div className=" h-screen">
        <Header />
        <div className="flex justify-center">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </>
  );
};
