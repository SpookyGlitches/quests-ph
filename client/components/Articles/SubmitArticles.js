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
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitArticle } from "../../validations/SubmitArticle";

export default function SubmitArticles() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

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

  const [openSb, setOpenSb] = React.useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSb(false);
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
          }) // eslint-disable-next-line
            .then((res) => {
              setMessage("You have successfully submitted your article!");
              setOpenSb(true);
            })
            .catch((error) => {
              console.log(error);
            });
          setOpen(false);
        } else {
          setMessage(
            "You already have a pending submission of the same article!",
          );
          setOpenSb(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

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
      <Snackbar
        open={openSb}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        action={action}
      />

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
