import { Box } from "@mui/system";
import { VoucherForm } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Card,
  CardContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Voucher() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Link href="/">
            <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Card elevation={0} sx={{ p: 1 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: 28, fontWeight: 700, textAlign: "center" }}
            >
              Buy Company Voucher
            </Typography>
            <Typography variant="subtitle1">
              Use it to purchase our services. We send it to you friend by the
              email
            </Typography>

            <VoucherForm />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
