import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import { VoucherFormData } from "@/components";
import { voucherMapper } from "@/utils";

interface Props {
  open: boolean;
  handleClose: () => void;
  submitValues: VoucherFormData;
}
export const SubmitModal = ({ open, handleClose, submitValues }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Submit Voucher Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <pre>{JSON.stringify(voucherMapper(submitValues), null, 2)}</pre>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
