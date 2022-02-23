import {
	Typography,
	Box,
	TextField,
	FormHelperText,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	Grid,
	StepLabel,
	Stack,
	Stepper,
	Button,
	Step,
} from "@mui/material";
import AppLayout from "../../components/Layouts/AppLayout";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";
const steps = ["Set the WOOP", "Configure Settings"];

const Create = () => {
	const [activeStep, setActiveStep] = useState(0);
	// eslint-disable-next-line no-undef

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<AppLayout>
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
				{/* {steps.length === activeStep && (
					<Confetti numberOfPieces={400} />
				)} */}

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
					<Typography
						variant="h4"
						sx={{
							color: (theme) => theme.palette.primary.main,
						}}
					>
						Create a Quest
					</Typography>
					<Stepper activeStep={activeStep}>
						{steps.map((label) => {
							const stepProps = {};
							const labelProps = {};

							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>
										{label}
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<Stack spacing={4}>
						{activeStep === 0 ? (
							<>
								<TextField
									fullWidth
									id="filled-basic"
									label="Wish"
									helperText="What is something that you want to achieve?"
								/>
								<TextField
									fullWidth
									id="filled-basic"
									label="Outcome"
									helperText="What positive impact can your wish bring to you?"
								/>
								<TextField
									fullWidth
									id="filled-basic"
									label="Obstacle"
									multiline
									minRows={3}
									maxRows={7}
									helperText="What's stopping you from achieving your wish?"
								/>
								<TextField
									fullWidth
									id="filled-basic"
									label="Plan"
									multiline
									minRows={3}
									maxRows={7}
									helperText="What steps will you take to overcome your obstacle?"
								/>
							</>
						) : (
							<>
								<FormControl variant="filled">
									<InputLabel>Category</InputLabel>
									<Select>
										<MenuItem>Health</MenuItem>
										<MenuItem>Career</MenuItem>
										<MenuItem>Social</MenuItem>
										{/* <MenuItem>Social</MenuItem> ??? na pa ba? hahahahha */}
									</Select>
									<FormHelperText></FormHelperText>
								</FormControl>
								<FormControl variant="filled">
									<InputLabel>Difficulty</InputLabel>
									<Select>
										<MenuItem>Easy</MenuItem>
										<MenuItem>Medium</MenuItem>
										<MenuItem>Hard</MenuItem>
									</Select>
									<FormHelperText>
										If public, let your potential party
										members know the difficulty.
									</FormHelperText>
								</FormControl>
								<FormControl variant="filled">
									<InputLabel>Visibility</InputLabel>
									<Select>
										<MenuItem>Only Me</MenuItem>
										<MenuItem>Public</MenuItem>
									</Select>
									<FormHelperText>
										Setting to Public means every content
										can be seen to all users.
									</FormHelperText>
								</FormControl>
								<div>
									<Grid container spacing={2}>
										<Grid item md={6} xs={12}>
											<FormControl
												variant="filled"
												sx={{ width: "100%" }}
											>
												<DatePicker
													label="Start date"
													minDate={new Date()}
													onChange={() => {}}
													renderInput={(params) => (
														<TextField
															{...params}
														/>
													)}
												/>
												<FormHelperText>
													Set it to a later time to
													have potential party
													members.
												</FormHelperText>
											</FormControl>
										</Grid>
										<Grid item md={6} xs={12}>
											<FormControl
												variant="filled"
												sx={{ width: "100%" }}
											>
												<DatePicker
													label="End date"
													minDate={new Date()}
													onChange={() => {}}
													renderInput={(params) => (
														<TextField
															{...params}
														/>
													)}
												/>
												<FormHelperText>
													Set the graduation day!
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
								</div>
							</>
						)}
					</Stack>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							color="inherit"
							disabled={
								activeStep === 0 || activeStep === steps.length
							}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />

						<Button
							onClick={handleNext}
							disabled={steps.length === activeStep}
						>
							{activeStep === steps.length - 1
								? "Finish"
								: "Next"}
						</Button>
					</Box>
				</Box>
			</Box>
		</AppLayout>
	);
};

export default Create;
