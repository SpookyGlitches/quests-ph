import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Step1 from "./Create/Step1";
import { oopValidations } from "../../validations/partyMember";

export default function WoopModal({ handleOk, handleCancel, okText, details }) {
  const methods = useForm({
    resolver: yupResolver(oopValidations),
    defaultValues: {
      outcome: "",
      obstacle: "",
      plan: "",
    },
  });

  const { handleSubmit, setValue } = methods;
  useEffect(() => {
    if (!details.statement) return;
    const { outcome, obstacle, plan } = details.statement;
    setValue("outcome", outcome);
    setValue("obstacle", obstacle);
    setValue("plan", plan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <Dialog fullWidth open={details?.open}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogTitle color="primary">
            {details?.title || "Quest Overview"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  Wish
                </Typography>
                <Typography variant="subtitle1">
                  {details?.statement?.wish}
                </Typography>
              </Box>
              <Step1 />
            </Stack>
          </DialogContent>
          <DialogActions sx={{}}>
            <Box sx={{ marginX: 1, display: "flex", gap: 2, marginBottom: 1 }}>
              <Button
                autoFocus
                onClick={handleCancel}
                disabled={details?.loading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {okText || "Ok"}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
