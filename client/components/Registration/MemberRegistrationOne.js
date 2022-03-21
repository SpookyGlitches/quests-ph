// import React from "react";
// import PropTypes from "prop-types";
// import { TextField, Button, Stack, Typography } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
// import { DatePicker } from "formik-mui-lab";
// import moment from "moment";

// const validationSchema = yup.object({
//   displayName: yup.string().required("Display Name is required").max(20),
//   birthdate: yup.string().nullable().required("Please input your birthdate"),
// });

// const MemberRegistrationOne = ({ formData, setFormData, nextStep }) => {
//   return (
//     <Formik
//       initialValues={formData}
//       onSubmit={(values) => {
//         setFormData(values);
//         nextStep();
//       }}
//       validationSchema={validationSchema}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <Stack spacing={2}>
//             <Button
//               style={{
//                 borderRadius: 10,
//                 minheight: "56px",
//                 width: "100%",
//                 backgroundColor: "white",
//                 color: "black",
//                 marginTop: "1rem",
//               }}
//               variant="contained"
//             >
//               <img
//                 src="/auth/google.png"
//                 width="15"
//                 height="15"
//                 alt="questsgoogle"
//               />{" "}
//               &nbsp; Sign Up with Google
//             </Button>
//             <Typography align="center">or</Typography>
//             <Field
//               name="displayName"
//               label="Display Name *"
//               margin="normal"
//               as={TextField}
//               error={touched.displayName && errors.displayName}
//               helperText={touched.displayName && errors.displayName}
//             />
//             <Field
//               name="fullName"
//               label="Full Name"
//               margin="normal"
//               as={TextField}
//             />
//             <Field
//               component={DatePicker}
//               name="birthdate"
//               label="BirthDate"
//               style={{ maxWidth: "100%" }}
//               error={touched.birthdate && errors.birthdate}
//               helperText={touched.birthdate && errors.birthdate}
//               // eslint-disable-next-line
//               maxDate={moment().subtract(18, "years")._d}
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Continue
//             </Button>
//           </Stack>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// MemberRegistrationOne.propTypes = {
//   // eslint-disable-next-line
//   formData: PropTypes.object.isRequired,
//   setFormData: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired,
// };

// export default MemberRegistrationOne;
