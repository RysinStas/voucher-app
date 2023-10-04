import { VoucherFormData } from "@/components";

export const voucherMapper = (data: VoucherFormData): any => {
  return { ...data, sentDate: data.sentDate.format("YYYY-MM-DD") };
};
