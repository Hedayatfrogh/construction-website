import { useLanguage } from "../../context/LanguageContext";
import { formatPhoneDisplay } from "../../utils/phoneDisplay";

/** Displays a phone number in the active language; keep dir=ltr so + stays on the left. */
export default function PhoneNumber({ value, className = "" }) {
  const { lang } = useLanguage();
  return (
    <span className={className} dir="ltr">
      {formatPhoneDisplay(value, lang)}
    </span>
  );
}
