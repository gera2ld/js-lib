import dayjs from "https://esm.sh/dayjs@1.11.10/esm";
import timezone from "https://esm.sh/dayjs@1.11.10/esm/plugin/timezone";
import utc from "https://esm.sh/dayjs@1.11.10/esm/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
export { dayjs };