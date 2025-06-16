import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { FirstTable } from "./first-table";
import { SecondTable } from "./second-table";
import { ThirdTable } from "./third-table";

export const CarouselTables = () => {
  return (
    <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div className="w-full">
          <FirstTable />
        </div>
        <div className="w-full">
          <SecondTable />
        </div>
        <div className="w-full">
          <ThirdTable />
        </div>
      </Carousel>
    </div>
  );
};
