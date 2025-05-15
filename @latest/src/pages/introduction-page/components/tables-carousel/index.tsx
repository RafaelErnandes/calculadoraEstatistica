import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { FirstTable } from "./first-table";
import mediaImg from "../../../../images/mediaImg.png";
import modaImg from "../../../../images/modaImg.png";
import {SecondTable} from './second-table'
import {ThirdTable} from './third-table'

export const TableData = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      <div>
        <FirstTable />
      </div>
      <div>
        <SecondTable/>
      </div>
      <div>
        <ThirdTable/>
      </div>
    </Carousel>
  );
};
