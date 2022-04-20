import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { add } from "date-fns";

export default function Step2({ wishItem, disables }) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {wishItem}

      <Controller
        name="category"
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error={Boolean(errors.category)}>
            <InputLabel>Category</InputLabel>

            <Select
              onChange={onChange}
              value={value}
              disabled={disables?.category}
            >
              <MenuItem value="HEALTH">Health</MenuItem>
              <MenuItem value="CAREER">Career</MenuItem>
              <MenuItem value="SOCIAL">Social</MenuItem>
            </Select>
            <FormHelperText>
              {errors.category && errors.category.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="difficulty"
        render={({ field: { onChange, value } }) => (
          <FormControl
            variant="filled"
            error={Boolean(errors.difficulty)}
            disabled={disables?.difficulty}
          >
            <InputLabel>Difficulty</InputLabel>

            <Select onChange={onChange} value={value}>
              <MenuItem value="EASY">Easy</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HARD">Hard</MenuItem>
            </Select>
            <FormHelperText>
              {errors.difficulty
                ? errors.difficulty.message
                : "If public, let your potential party members know the difficulty."}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        name="visibility"
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error={Boolean(errors.visibility)}>
            <InputLabel>Visibility</InputLabel>

            <Select
              onChange={onChange}
              value={value}
              disabled={disables?.visibility}
            >
              <MenuItem value="PUBLIC">Public</MenuItem>
              <MenuItem value="PRIVATE">Private</MenuItem>
            </Select>
            <FormHelperText>
              {errors.visibility
                ? errors.visibility.message
                : "Setting to Public means every content can be seen to all users."}
            </FormHelperText>
          </FormControl>
        )}
      />

      <div>
        <Grid container spacing={5}>
          <Grid item md={6} xs={12} sx={{}}>
            <Controller
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <FormControl variant="filled" sx={{ width: "100%" }}>
                  <DatePicker
                    label="Start date"
                    disablePast
                    value={value}
                    onChange={onChange}
                    disabled={disables?.startDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={Boolean(errors.startDate)}
                      />
                    )}
                  />
                  <FormHelperText>
                    {errors.startDate
                      ? errors.startDate.message
                      : "Set it to a later time to have potential party members."}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="filled"
                  error={Boolean(errors.endDate)}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    label="End date"
                    disabled={disables?.endDate}
                    minDate={add(new Date(), { days: 1 })}
                    value={value}
                    disablePast
                    onChange={onChange}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          error={Boolean(errors.endDate)}
                        />
                      );
                    }}
                  />
                  <FormHelperText>
                    {errors.endDate
                      ? errors.endDate.message
                      : "Set the graduation day."}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
