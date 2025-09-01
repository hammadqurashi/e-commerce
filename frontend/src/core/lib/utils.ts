import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceUrlVariables = (str: string, params: any) => {
  const stripedText = str.replace(/{([^{}]+)}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : "";
  });
  return stripedText;
};

export const buildFormData = (
  formData: FormData,
  data: any,
  parentKey?: any
) => {
  if (Array.isArray(data)) {
    data.forEach((value) => {
      formData.append(parentKey!, value);
    });
  } else if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
};

export const currencyFormatter = (
  amount: string | number,
  currencyCode: string,
  options = {}
) => {
  try {
    if (!amount) return `$0`;

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(Number(amount));

    return formattedAmount
      .replace(/(\.\d*?[1-9])0+$/g, "$1")
      .replace(/\.00$/, "");
  } catch (err) {
    console.log(err);
    return `$0`;
  }
};
