import { Locale, format, parseISO } from "date-fns"
import I18n from "i18n-js"

import ar from "date-fns/locale/ar-SA"
import ko from "date-fns/locale/ko"
import en from "date-fns/locale/en-US"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "ar" ? ar : locale === "ko" ? ko : en
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}

export const ensureFullISODate= (dateString: string): string => {
  if (!dateString) { return ""; }
  const match = dateString.match(/T\d{2}$/);

  if (match) {
    // if dateString ends with "T" followed by two digits (an hour), add ":00:00" for minutes and seconds
    return dateString + ":00:00";
  } else {
    // otherwise, return the dateString as is
    return dateString;
  }
}
