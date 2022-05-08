import {
  TextField,
  Stack,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Step3() {
  const {
    formState: { errors },
  } = useFormContext(); //
  return (
    <Stack spacing={2}>
      <Controller
        name="gwa"
        render={({ field: { onChange, value } }) => (
          <TextField
            id="filled-basic"
            label="GWA"
            onChange={onChange}
            value={value}
            error={errors.gwa && errors.gwa.message}
            helperText={errors.gwa ? errors.gwa.message : ""}
          />
        )}
      />
      <Controller
        name="yearLevel"
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error={Boolean(errors.yearLevel)}>
            <InputLabel>Year Level</InputLabel>

            <Select onChange={onChange} value={value}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="College Graduate">College Graduate</MenuItem>
            </Select>
            <FormHelperText>
              {errors.yearLevel && errors.yearLevel.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="course"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Course"
            onChange={onChange}
            value={value}
            error={errors.course && errors.course.message}
            helperText={errors.course ? errors.course.message : ""}
          />
        )}
      />
      <FormHelperText>Input N/A if not applicable</FormHelperText>
    </Stack>
  );
}
