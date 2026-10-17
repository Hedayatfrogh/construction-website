const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export const toWesternDigits = (value) =>
  String(value ?? "")
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

export const toPersianDigits = (value) =>
  String(value ?? "").replace(/\d/g, (d) => PERSIAN_DIGITS[d]);

export function formatPhoneDisplay(value, lang) {
  const western = toWesternDigits(value).trim();
  if (lang === "fa") return toPersianDigits(western);
  return western;
}

export function telHref(value) {
  return `tel:${toWesternDigits(value).replace(/\s+/g, "")}`;
}
