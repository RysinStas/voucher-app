"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import Slider from "@mui/material/Slider";
import { Divider, InputAdornment, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import { Friend, FriendSearch } from "@/components/FriendSearch";
import React from "react";
import { SubmitModal } from "@/components/Voucher/SubmitModal";
import { VoucherView } from "@/components/Voucher/VoucherView";

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5000;
const CURRENCY = "₴";

export interface VoucherFormData {
  amount: number;
  to: null | Friend;
  from: string;
  message: string;
  sentDate: Dayjs;
}

export const VoucherForm = () => {
  const currentDay = dayjs();
  const { handleSubmit, watch, getValues, control } = useForm<VoucherFormData>({
    mode: "onTouched",
    defaultValues: {
      amount: MIN_AMOUNT,
      to: null,
      from: "Jonny Black",
      message: "",
      sentDate: currentDay,
    },
  });
  const [openSubmitModal, setOpenSubmitModal] = React.useState(false);
  const onSubmit: SubmitHandler<VoucherFormData> = (data) => {
    setOpenSubmitModal(true);
    console.log(data);
  };

  const sliderMarks = [
    {
      value: MIN_AMOUNT,
      label: `${MIN_AMOUNT} ${CURRENCY}`,
    },
    {
      value: MAX_AMOUNT,
      label: `${MAX_AMOUNT} ${CURRENCY}`,
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VoucherView amount={watch("amount")} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 700 }}>
            Choose an amount.
          </Typography>
          <Controller
            name={"amount"}
            control={control}
            defaultValue={MIN_AMOUNT}
            rules={{
              required: { value: true, message: "Field required" },
              min: { value: MIN_AMOUNT, message: `Min value ${MIN_AMOUNT}` },
              max: { value: MAX_AMOUNT, message: `Min value  ${MAX_AMOUNT}` },
            }}
            render={({
              field: { onChange, value, onBlur, ...field },
              fieldState: { error },
            }) => (
              <>
                <Slider
                  step={100}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  marks={sliderMarks}
                  valueLabelDisplay="auto"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, fontWeight: 400 }}
                >
                  {`Or enter your own amount (${MIN_AMOUNT}-${MAX_AMOUNT} ${CURRENCY}).`}
                </Typography>
                <TextField
                  type={"number"}
                  label={"amount"}
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size="small"
                  error={!!error}
                  helperText={error?.message || " "}
                  onBlur={onBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{CURRENCY}</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          />
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 700 }}>
            Enter your delivery details.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 400 }}>
            Choose a friend to send the voucher to.
          </Typography>
          <Controller
            name="to"
            control={control}
            rules={{ required: { value: true, message: "Field required" } }}
            render={({
              field: { onChange, value, onBlur, ref, ...field },
              fieldState: { error },
            }) => (
              <FriendSearch
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error?.message || " "}
              />
            )}
          />
          <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 400 }}>
            Put your name
          </Typography>
          <Controller
            name="from"
            control={control}
            rules={{ required: { value: true, message: "Field required" } }}
            render={({
              field: { onChange, value, onBlur, ...field },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  label={"From"}
                  value={value}
                  onChange={onChange}
                  fullWidth
                  size="small"
                  error={!!error}
                  helperText={error?.message || " "}
                  onBlur={onBlur}
                />
              );
            }}
          />
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 700 }}>
            Personalize the voucher by entering a message.
          </Typography>
          <Controller
            name={"message"}
            control={control}
            rules={{
              maxLength: {
                value: 200,
                message: "Message must be 200 characters or fewer",
              },
            }}
            render={({
              field: { onChange, value, onBlur, ...field },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  {...field}
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={!!error}
                  size="small"
                  helperText={
                    error?.message ||
                    `${200 - value.length} characters remaining`
                  }
                />
              );
            }}
          />
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 700 }}>
            Select when you want to send the voucher.
          </Typography>
          <Controller
            name={"sentDate"}
            control={control}
            rules={{ required: { value: true, message: "Field required" } }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                minDate={currentDay}
                sx={{ width: "100%", ".MuiInputBase-root": { height: 40 } }}
                slotProps={{
                  textField: {
                    onBlur,
                    error: !!error,
                    helperText: error?.message || " ",
                  },
                }}
              />
            )}
          />
          <Button type="submit" fullWidth variant={"contained"}>
            Buy voucher
          </Button>
        </Box>
      </form>
      <SubmitModal
        open={openSubmitModal}
        handleClose={() => setOpenSubmitModal(false)}
        submitValues={getValues()}
      />
    </LocalizationProvider>
  );
};
