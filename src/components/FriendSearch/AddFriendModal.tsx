import { FormEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Friend } from "@/components";

interface Props {
  open: boolean;
  value: Friend;
  onChange: (value: Friend) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
export const AddFriendModal = ({
  open,
  value,
  onChange,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ ".MuiPaper-root": { maxWidth: 360 } }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>Add a new friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add a friend to your contact list.
          </DialogContentText>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
            <TextField
              autoFocus
              required
              fullWidth
              name="name"
              margin="dense"
              value={value.fullName}
              onChange={(event) =>
                onChange({
                  ...value,
                  fullName: event.target.value,
                })
              }
              label="Full name"
              type="text"
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              fullWidth
              required
              name="email"
              value={value.email}
              onChange={(event) =>
                onChange({
                  ...value,
                  email: event.target.value,
                })
              }
              label="Email"
              type="text"
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              fullWidth
              required
              name="phone"
              value={value.phoneNumber}
              onChange={(event) =>
                onChange({
                  ...value,
                  phoneNumber: event.target.value,
                })
              }
              label="Phone number"
              type="text"
              variant="outlined"
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
