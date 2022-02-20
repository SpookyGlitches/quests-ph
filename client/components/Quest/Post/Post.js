import {
	Box,
	Avatar,
	Typography,
	Stack,
	Button,
	Card,
	CardHeader,
	CardContent,
	IconButton,
	CardActions,
	Paper,
	CardMedia,
	Divider,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import { formatRelative } from "date-fns";
import Emoji1 from "../../Icons/Emoji1";
import Emoji2 from "../../Icons/Emoji2";
import Emoji3 from "../../Icons/Emoji3";
import ClampLines from "react-clamp-lines";

const Post = ({
	username,
	createdAt,
	title,
	body,
	images,
	handlePostOptionsClick,
	handleReactClick,
}) => {
	return (
		<Card
			sx={{
				width: "100%",
			}}
		>
			<CardHeader
				avatar={
					<Avatar
						sx={{
							bgcolor: "pink",
						}}
						aria-label="recipe"
					>
						{username[0]}
					</Avatar>
				}
				action={
					<IconButton
						aria-label="settings"
						onClick={handlePostOptionsClick}
					>
						<MoreHorizRoundedIcon />
					</IconButton>
				}
				title={username}
				subheader={
					<Box>
						{formatRelative(
							new Date(JSON.parse(createdAt)),
							new Date()
						)}
					</Box>
				}
			/>
			{images.length > 0 ? (
				<Box sx={{ position: "relative" }}>
					<CardMedia
						component="img"
						height="300"
						image={images[0]}
						alt="Paella dish"
						sx={{ position: "relative" }}
					/>

					{images.length > 1 && (
						<Paper
							sx={{
								position: "absolute",
								bottom: "1rem",
								right: "1rem",
								padding: "0.2rem",
							}}
						>
							<Typography variant="subtitle2" display="block">
								{images.length} images
							</Typography>
						</Paper>
					)}
				</Box>
			) : (
				<Box>
					<CardMedia
						component="video"
						image="/the-feels.mp4"
						title="title"
						controls
					/>
				</Box>
			)}

			<CardContent sx={{ width: "100%" }}>
				<Stack spacing={2} sx={{ width: "100%" }}>
					<Typography variant="h6">{title}</Typography>

					<ClampLines
						text={body}
						id="really-unique-id"
						lines={4}
						className=""
						innerElement="p"
					/>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							width: "100%",
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
								flexWrap: "wrap",
							}}
						>
							<Stack direction="row" spacing={-1.5}>
								<Emoji1 width="30" height="30" />
								<Emoji2 width="30" height="30" />
								<Emoji3 width="30" height="30" />
							</Stack>
							<Typography variant="body2">4 reacts</Typography>
						</Box>
						<Typography variant="body2">3 comments</Typography>
					</Box>
					<Divider variant="middle" />
				</Stack>
			</CardContent>
			<CardActions
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					gap: 3,
					flexWrap: "wrap",
				}}
			>
				<Button
					variant="text"
					startIcon={<AddReactionRoundedIcon />}
					onClick={handleReactClick}
					size="medium"
				>
					React
				</Button>
				<Button
					variant="text"
					startIcon={<InsertCommentRoundedIcon />}
					size="medium"
				>
					Comment
				</Button>
			</CardActions>
		</Card>
	);
};
export default Post;
