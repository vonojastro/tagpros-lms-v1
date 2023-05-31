import moment from "moment";

export const getDaysAvailability = (dayOfWeek, startTime, endTime) => {
  const days = ["Su", "M", "T", "W", "Th", "F", "Sa"];
  const timeAvailability =
    startTime === endTime
      ? "24hrs"
      : `${moment(startTime, "HH:mm").format("HH:mm A")} - ${moment(
          endTime,
          "HH:mm"
        ).format("hh:mm A")}`;

  switch (dayOfWeek) {
    case "0XXXXX0":
      return `Weekdays - ${timeAvailability}`;
    case "X00000X":
      return `Weekends - ${timeAvailability}`;
    case "XXXXXXX":
      if (timeAvailability === "24hrs") {
        return "24/7";
      } else {
        return `Everyday - ${timeAvailability}`;
      }
    default:
      return `${[...dayOfWeek]
        .map((ch, index) => (ch === "X" ? days[index] : ""))
        .join("")} - ${timeAvailability}`;
  }
};

export const isNotAvailable = (method, subTotal) => {
  console.log("🚀 ~ file: index.js ~ line 32 ~ isNotAvailable ~ subTotal", subTotal);
  const { dayOfWeek, startTime, endTime, minAmount, maxAmount, status } = method;
  const currDay = moment().day();
  const currTime = moment(new Date(), "HH:mm");
  const momentStartTime = moment(startTime, "HH:mm");
  const momentEndTime = moment(endTime, "HH:mm");
  const isAvailableThisDay = dayOfWeek.charAt(currDay) === "X";
  const isAvailableThisTime =
    startTime === endTime || currTime.isBetween(momentStartTime, momentEndTime);
  const isAmountAvailable = subTotal >= minAmount && subTotal <= maxAmount;
  return !(
    isAvailableThisDay &&
    isAvailableThisTime &&
    isAmountAvailable &&
    status === "A"
  );
};
