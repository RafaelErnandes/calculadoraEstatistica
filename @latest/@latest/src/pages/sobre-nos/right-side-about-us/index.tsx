import { Carousel } from "react-responsive-carousel";
import imageRafa from "../../../images/rafa.jpg";
import imageThur from "../../../images/thur.jpg";

export const RightSideAboutUs = () => {
  return (
    <div className="w-3/4 p-10 flex justify-center">
      <Carousel
        // autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div>
          <img src={imageThur} alt="Imagem do dev backend" className="h-96" />
        </div>
        <div>
          <img src={imageRafa} alt="Imagem do dev frontend" className="h-96" />
        </div>
      </Carousel>
    </div>
  );
};
