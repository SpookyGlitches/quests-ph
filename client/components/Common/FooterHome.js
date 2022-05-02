import { useState } from "react";
import {
  Typography,
  Link as MuiLink,
  Box,
  Tooltip,
  Divider,
  Modal,
  List,
  ListItem,
  Button,
  ListItemText,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <Typography
      variant="caption"
      sx={{ fontSize: "13px", fontWeight: "regular" }}
    >
      {`Copyright © Quests ${year}`}
    </Typography>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  overflow: "scroll",
  border: "2px solid #755cde",
  boxShadow: 24,
  p: 2,
};
const text = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "#755CDE",
};

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: {
          xs: "space-around",
          lg: "center",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="subtitle2">
          <Link href="/landing/privacy-policy" passHref>
            <MuiLink>Privacy Policy</MuiLink>
          </Link>
        </Typography>
        <Typography variant="subtitle2">
          <Tooltip title="Discover how to earn points" arrow>
            <IconButton
              sx={{ "&.MuiIconButton-root": { p: 0 } }}
              onClick={handleOpen}
            >
              <InfoRoundedIcon sx={{ color: "#C2B7ED" }} />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography variant="subtitle2">
          <Link href="/landing/terms-of-service" passHref>
            <MuiLink>Terms of Service</MuiLink>
          </Link>
        </Typography>
      </Box>
      <Box sx={{ marginTop: 1 }}>
        <Copyright />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ListItemText
            primaryTypographyProps={{ style: text }}
            primary="Earn More Points"
            secondary={
              <Typography sx={{ color: "#755CDE", fontSize: "15px" }}>
                List of action that generates points.
              </Typography>
            }
          />
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      display: "inline",
                      fontSize: "15px",
                      fontWeight: "medium",
                    }}
                  >
                    Completed A Task
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Points varies set by the Mentor
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Successfully submitted article
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +20
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Comments
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +10
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentees - Easy)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +10
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentees - Medium)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +25
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentees - Difficult)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +50
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentors - Easy)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +20
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentors - Medium)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +35
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Completes A Public Quest - (Mentors - Difficult)
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +60
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Receives A Post React - <b>(Inside Quest)</b>
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +5
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Receives A Comment React - <b>(Inside Quest)</b>
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +1
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Receives A Post React - <b>(Outside Quest)</b>
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +5
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Receives A Comment React - <b>(Outside Quest)</b>
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +5
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "15px", fontWeight: "medium" }}>
                    Receives A Comment
                  </Typography>
                }
              />
              <Typography
                color="#755CDE"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                +10
              </Typography>
            </ListItem>
            <Divider />
          </List>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
