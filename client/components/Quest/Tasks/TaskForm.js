import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import axios from "axios";
import { add } from "date-fns";

import { InputAdornment, TextField, Stack, Box, Button } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SportsScoreRoundedIcon from "@mui/icons-material/SportsScoreRounded";
import { useSnackbar } from "notistack";

import { createTaskSchema } from "../../../validations/TasksCreate";

const TaskForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createTaskSchema) });

  const onSubmit = async (data) => {
    const { questId } = router.query;

    try {
      const res = await axios
        .post(`/api/quests/${questId}/tasks/create`, data)
        .then(() => {
          enqueueSnackbar(`Succesfully created a task`);
        });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    router.push(`/quests/${questId}/tasks`);
    console.log("inserted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({
            // eslint-disable-next-line
            field:
              // eslint-disable-next-line
              { onChange, value },
            fieldState: { invalid },
          }) => (
            <TextField
              // eslint-disable-next-line
              value={value}
              // eslint-disable-next-line
              onChange={(value) => onChange(value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleRoundedIcon />
                  </InputAdornment>
                ),
              }}
              label="Title"
              helperText={errors.title && <p>{errors.title.message}</p>}
              error={invalid}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({
            // eslint-disable-next-line
            field:
              // eslint-disable-next-line
              { onChange, value },
            fieldState: { invalid },
          }) => (
            <TextField
              // eslint-disable-next-line
              value={value}
              // eslint-disable-next-line
              onChange={(value) => onChange(value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionRoundedIcon />
                  </InputAdornment>
                ),
              }}
              label="Description"
              helperText={
                errors.description && <p>{errors.description.message}</p>
              }
              error={invalid}
            />
          )}
        />

        <Controller
          name="points"
          control={control}
          defaultValue=""
          render={({
            // eslint-disable-next-line
            field:
              // eslint-disable-next-line
              { onChange, value },
            fieldState: { invalid },
          }) => (
            <TextField
              // eslint-disable-next-line
              value={value}
              // eslint-disable-next-line
              onChange={(value) => onChange(value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SportsScoreRoundedIcon />
                  </InputAdornment>
                ),
              }}
              label="Points"
              helperText={errors.points && <p>{errors.points.message}</p>}
              error={invalid}
            />
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          defaultValue={new Date()}
          render={({
            // eslint-disable-next-line
            field:
              // eslint-disable-next-line
              { onChange, value },
            fieldState: { invalid },
          }) => (
            <DatePicker
              label="Due Date"
              value={value}
              minDate={add(new Date(), { days: 1 })}
              // eslint-disable-next-line
              onChange={(value) => onChange(moment(value).format("YYYY-MM-DD"))}
              renderInput={(params) => (
                <TextField
                  helperText={errors.dueDate && <p>{errors.dueDate.message}</p>}
                  id="dueAt"
                  {...params}
                  error={invalid}
                />
              )}
            />
          )}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default TaskForm;
