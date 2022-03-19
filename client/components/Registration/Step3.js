import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FileUpload from "./FileUpload";

export default function Step2() {
  const {
    formState: { errors },
  } = useFormContext(); //
  return (
    <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
      <Controller
        name="experience"
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error={Boolean(errors.experience)}>
            <InputLabel>Do you have any experience in mentoring?</InputLabel>

            <Select onChange={onChange} value={value}>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            <FormHelperText>
              {errors.experience && errors.experience.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="detailedExperience"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="If yes, what kind of mentoring?"
            multiline
            rows={3}
            onChange={onChange}
            value={value}
            error={
              errors.detailedExperience && errors.detailedExperience.message
            }
            helperText={
              errors.detailedExperience ? errors.detailedExperience.message : ""
            }
          />
        )}
      />
      <FileUpload name="fileUpload" label="File Upload" />
    </Stack>
  );
}
