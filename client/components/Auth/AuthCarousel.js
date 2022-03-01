import Carousel from "react-material-ui-carousel";

const AuthCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      sx={{
        height: "auto",
        width: "auto",
        backgroundColor: "#755CDE",
      }}
    >
      <img
        style={{ width: "auto", height: "auto" }}
        alt="Quests"
        src="/auth/carousel1.png"
      />

      <img
        style={{ width: "auto", height: "auto" }}
        alt="Quests"
        src="/auth/carousel2.png"
      />

      <img
        style={{ width: "auto", height: "auto" }}
        alt="Quests"
        src="/auth/carousel3.png"
      />
    </Carousel>
  );
};

export default AuthCarousel;
