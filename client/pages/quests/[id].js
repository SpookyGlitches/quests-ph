import { faker } from "@faker-js/faker";
import PostsList from "../../components/Quest/Post/PostsList";
import { Box, Container } from "@mui/material";

const Index = ({ data }) => {
	return (
		<Box
			sx={{
				width: "100%",
				backgroundColor: "background.default",
				padding: "1rem",
			}}
		>
			<Container sx={{ width: "50vw" }}>
				<PostsList posts={data} />
			</Container>
		</Box>
	);
};
export default Index;
export async function getServerSideProps() {
	// should be getstatic pero noo
	const data = [];
	for (var i = 0; i < 5; i++) {
		const rand = Math.floor(Math.random() * 3);
		const images = [...Array(rand)].map(() =>
			faker.image.people(null, null, true)
		);
		data.push({
			username: faker.name.firstName(),
			title: faker.lorem.lines(2),
			createdAt: JSON.stringify(faker.date.recent()),
			body: faker.lorem.lines(30),
			images: images,
		});
	}
	return {
		props: {
			data,
		},
	};
}
