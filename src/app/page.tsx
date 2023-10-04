import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      height={"100VH"}
    >
      <Link href="voucher/">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 0, mb: 0 }}
        >
          Click to buy Voucher
        </Button>
      </Link>
    </Stack>
  );
}
