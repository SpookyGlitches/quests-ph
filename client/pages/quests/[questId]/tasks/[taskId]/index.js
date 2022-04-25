import {
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SportsScoreRoundedIcon from "@mui/icons-material/SportsScoreRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import Link from "next/link";

import axios from "axios";
import { add } from "date-fns";
import useSWR from "swr";
import { createTaskSchema } from "../../../../../validations/TasksCreate";
import AppLayout from "../../../../../components/Layouts/AppLayout";

const UpdateTask = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createTaskSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `/api/quests/${router.query.questId}/tasks/${router.query.taskId}`,
        data,
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    router.push(`/quests/${router.query.questId}/tasks`);
    console.log("updated");
  };

  const { data, error } = useSWR(
    `/quests/${router.query.questId}/tasks/${router.query.taskId}`,
    { refreshInterval: 1000 },
  );
  // trigger(
  //   `http://localhost:3000/quests/${router.query.id}/tasks/${router.query.taskId}`,
  // );

  // as of now there is a delay after updating fields it wont directly fetch updated information
  if (error) return <div>failed to load</div>;
  if (!data) return <LinearProgress />;

  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: 1,
          border: "1px solid rgba(0, 0, 0, 0.12)",
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
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Link href={`/quests/${router.query.questId}/tasks`} passHref>
              <Button startIcon={<ArrowBackRoundedIcon />}>Back</Button>
            </Link>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Update Task
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Controller
                name="title"
                control={control}
                defaultValue={data.title}
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
                defaultValue={data.description}
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
                defaultValue={data.points}
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
                defaultValue={data.dueAt}
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
                    disablePast
                    // eslint-disable-next-line
                    onChange={(value) =>
                      onChange(moment(value).format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField
                        helperText={
                          errors.dueDate && <p>{errors.dueDate.message}</p>
                        }
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
                  Update
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </AppLayout>
  );
};
export default UpdateTask;
