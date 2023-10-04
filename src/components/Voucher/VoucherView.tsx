import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface Props {
  amount: number;
}
export const VoucherView = ({ amount }: Props) => {
  return (
    <Box
      sx={{
        "&::before": {
          content: '""',
          position: "absolute",
          width: "210px",
          height: "210px",
          background: "#1565c0",
          borderRadius: "50%",
          top: "-125px",
          right: "-15px",
          opacity: 0.5,
        },
        position: "relative",
        width: "100%",
        p: 2,
        aspectRatio: 1.6,
        color: "#ffffff",
        backgroundColor: "#1e88e5",
        borderRadius: 3,
        overflow: "hidden",

        "&::after": {
          content: '""',
          position: "absolute",
          width: "210px",
          height: "210px",
          background: "#1565c0",
          borderRadius: "50%",
          top: "-85px",
          right: "-95px",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant={"h5"}>Voucher</Typography>
      </Box>
      <Box sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 2 }}>
        <Typography variant={"h4"}> {`${amount} ₴`}</Typography>
      </Box>
    </Box>
  );
};
