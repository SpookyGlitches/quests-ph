import React from "react";
import PropTypes from "prop-types";
import { Stack, Box } from "@mui/material";
// eslint-disable-next-line
const MemberRegistrationThree = ({ formData }) => {
  // const { displayName, fullName, birthdate } = formData;
  return (
    <Box sx={{ alignItems: "center" }}>
      <Stack spacing={1.5}>
        <h3>You have registered for an account.</h3>
      </Stack>
    </Box>
  );
};

MemberRegistrationThree.propTypes = {
  // eslint-disable-next-line
  formData: PropTypes.object.isRequired,
};

export default MemberRegistrationThree;
