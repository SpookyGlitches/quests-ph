import { Grid, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const AuthLayout = ({ children }) => {
	return (
		<Grid
			container
			sx={{
				backgroundColor: "background.default",
				height: "100vh",
				width: "100vw",
			}}
		>
			<Grid
				item
				xs={12}
				sm={6}
				order={{ xs: 3, sm: 2 }}
				sx={{ height: "100%", backgroundColor: "primary.main" }}
			>
				<Carousel
					autoPlay
					infiniteLoop
					showThumbs={false}
					sx={{
						height: "100%",
						width: "100%",
					}}
				>
					<img alt="Quests Carousel Image 1" src="/auth/carousel1.png" />
					<img alt="Quests Carousel Image 2" src="/auth/carousel2.png" />
					<img alt="Quests Carousel Image 3" src="/auth/carousel3.png" />
				</Carousel>
			</Grid>
			<Grid
				item
				xs={12}
				sm={6}
				order={{ xs: 2, sm: 3 }}
				sx={{ height: "100%" }}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						height: "100%",
						width: "100%",
						gap: 3,
						padding: {
							xs: "4rem",
							md: "7rem",
						},
					}}
				>
					{children}
				</Box>
			</Grid>
		</Grid>
	);
};
export default AuthLayout;
