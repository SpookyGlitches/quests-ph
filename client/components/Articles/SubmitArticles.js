import * as React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { SubmitArticle } from "../../validations/SubmitArticle";

export default function SubmitArticles() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const currentValidationSchema = SubmitArticle[0];
  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      reportDetails: "",
    },
  });
  const { control, handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
    console.log(values);
    axios({
      method: "get",
      url: "/api/articles/submit",
      params: {
        link: values.link,
      },
    })
      .then((response) => {
        if (response.data.length !== 1) {
          axios({
            method: "POST",
            url: "/api/articles/submit",
            params: {
              category: values.category,
              link: values.link,
            },
          })
            .then(() => {
              console.log("hello");
              enqueueSnackbar("You have successfully submitted your article!");
            })
            .catch((error) => {
              console.log(error);
            });
          setOpen(false);
        } else {
          enqueueSnackbar(
            "You already have a pending submission of the same article!",
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "3em" }}
        onClick={handleClickOpen}
      >
        Submit Article
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" style={{ color: "#755cde" }}>
            Submit an Article
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ mt: -1 }}>
            <DialogContentText>
              <Typography>
                Submit your article with its corresponding category and link
                here
              </Typography>
            </DialogContentText>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <FormControl variant="filled">
                    <InputLabel>
                      Select the category of your submission
                    </InputLabel>

                    <Select onChange={onChange} value={value}>
                      <MenuItem value="HEALTH">Health</MenuItem>
                      <MenuItem value="SOCIAL">Social</MenuItem>
                      <MenuItem value="CAREER">Career</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: "red" }}>
                      {errors.category && errors.category.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="link"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="filled-basic"
                    label="Submit your article link here"
                    multiline
                    rows={2}
                    onChange={onChange}
                    value={value}
                    sx={{ mt: 2 }}
                    error={errors.link && errors.link.message}
                    helperText={errors.link ? errors.link.message : ""}
                  />
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              style={{
                backgroundColor: "#B0B0B0",
                borderColor: "#E8E8E8",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
