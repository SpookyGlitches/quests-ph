// import React, { useState } from "react";
// import MemberRegistrationOne from "./MemberRegistrationOne";
// import MemberRegistrationTwo from "./MemberRegistrationTwo";
// import MemberRegistrationThree from "./MemberRegistrationThree";

// export default function RegistrationForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     displayName: "",
//     fullName: "",
//     birthdate: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);
//   switch (step) {
//     case 1:
//       return (
//         <MemberRegistrationOne
//           formData={formData}
//           setFormData={setFormData}
//           nextStep={nextStep}
//         />
//       );
//     case 2:
//       return (
//         <MemberRegistrationTwo
//           formData={formData}
//           setFormData={setFormData}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       );
//     case 3:
//       return (
//         <MemberRegistrationThree
//           formData={formData}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       );
//     default:
//       return <>success</>;
//   }
// }
