import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { FirstTable } from "./first-table";
import mediaImg from "../../../../images/mediaImg.png";
import modaImg from "../../../../images/modaImg.png";

export const TableData = () => {
  return (
    <Carousel
      // autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <FirstTable />
      </div>
      <div>
        <img src={mediaImg} />
      </div>
      <div>
        <img src={modaImg} />
      </div>
    </Carousel>
  );
};
