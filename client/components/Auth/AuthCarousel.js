import Carousel from "react-material-ui-carousel";

const AuthCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      sx={{
        height: "100%",
        width: "100%",
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
