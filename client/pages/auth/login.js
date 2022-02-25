import {
	Typography,
	TextField,
	Button,
	Box,
	Stack,
	Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
export default function Login() {
	return (
		<AuthLayout>
			<AuthHeader subtitle="Sign in to your account" />
			<Stack direction="column" spacing={2}>
				<TextField
					fullWidth
					required
					id="filled-required"
					label="Email Address"
				/>
				<TextField
					fullWidth
					id="filled-password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
				/>
			</Stack>
			<Button variant="contained">Sign In</Button>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="string" align="center">
					Not yet registered?{" "}
					<Link href="/" passHref>
						<MuiLink sx={{ cursor: "pointer" }}>Create an account</MuiLink>
					</Link>
				</Typography>
				<Typography variant="string" align="center">
					Forgot password?{" "}
					<Link href="/" passHref>
						<MuiLink sx={{ cursor: "pointer" }}>Click here</MuiLink>
					</Link>
				</Typography>
			</Box>
		</AuthLayout>
	);
}
