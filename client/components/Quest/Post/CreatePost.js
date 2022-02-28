import {
	Box,
	Typography,
	FormControl,
	Select,
	MenuItem,
	TextField,
	InputLabel,
	Stack,
	FormHelperText,
	Button,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { alpha } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";

export default function CreatePost() {
	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*, video/*",
		onDropAccepted: (acceptedFiles) => {
			console.log(acceptedFiles);
		},
		onDropRejected: (rejectedFiles) => {
			console.log(rejectedFiles);
		},
	});

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "background.paper",
				borderRadius: 2,
			}}
		>
			<Box
				sx={{
					width: {
						xs: "100%",
						md: "80%",
					},
					padding: "2rem",
					display: "flex",
					flexDirection: "column",
					gap: 5,
				}}
			>
				<div>
					<Typography
						variant="h4"
						sx={{
							color: (theme) => theme.palette.primary.main,
						}}
						gutterBottom={false}
					>
						Create a Post
					</Typography>
					<Typography variant="subtitle1">
						You can upload images or a video. Share your progress or
						anything!
					</Typography>
				</div>
				<Stack spacing={4}>
					<FormControl fullWidth>
						<InputLabel id="quest-label">Quest</InputLabel>
						<Select
							labelId="quest-label"
							id="quest-label-select"
							label="Quest"
						>
							<MenuItem>Wo weee</MenuItem>
							<MenuItem>Oooh wee</MenuItem>
							<MenuItem>Hahhahah </MenuItem>
						</Select>
						<FormHelperText>
							Select the Quest to post on.
						</FormHelperText>
					</FormControl>

					<TextField
						label="Title"
						helperText="Add a title for your post."
					/>
					<TextField
						label="Description"
						multiline
						minRows={3}
						maxRows={8}
						helperText="Tell us more about your post."
					/>
					<Box
						{...getRootProps({ className: "dropzone" })}
						sx={{
							height: "8rem",
							borderStyle: "dashed",
							borderColor: "#cbcbcb",
							borderRadius: (theme) => theme.shape.borderRadius,
							borderWidth: "thin",
							cursor: "pointer",

							// remove lang ni later siguro
							"&:hover": {
								borderColor: (theme) =>
									theme.palette.common.black,
							},
							"&:focus-within": {
								borderColor: "primary.main",
								backgroundColor: (theme) =>
									alpha(theme.palette.primary.main, 0.1),
								color: "primary.main",
							},
						}}
					>
						<input {...getInputProps()} />
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
								height: "100%",
								padding: "2rem",
							}}
						>
							<CloudUploadRoundedIcon
								sx={{
									fontSize: "3rem",
								}}
							/>
							<Typography variant="body2" align="center">
								Drag and drop some images/video here, or click
								to add.
							</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex", justifyContent: "end" }}>
						<Button
							color="primary"
							variant="contained"
							sx={{
								width: { xs: "100%", md: "auto" },
							}}
						>
							Create Post
						</Button>
					</Box>
				</Stack>
			</Box>
		</Box>
	);
}
