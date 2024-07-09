// Function to get the day suffix
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Function to format the date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();
  const daySuffix = getDaySuffix(day);
  return `${day}${daySuffix} ${month}, ${year}`;
};

// Function to check if a string is not a photo URL
export const isNotPhotoUrl = (url) => {
  // Define a regular expression for photo file extensions
  const photoExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  return !photoExtensions.test(url);
};

// Function to calculate age from a date string
export const calculateAge = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if the current date is before the birth date in the current year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const formatDateToString = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const formatDateWithWeek = (dateString) => {
  const date = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = `${dayOfMonth}${getDaySuffix(dayOfMonth)}`;

  return `${dayOfWeek} ${dayWithSuffix} ${month}, ${year}`;
};

export const calculateDuration = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  let difference = end - now;

  if (difference <= 0) {
    return "Time has already passed";
  }

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;

  // Calculate days, hours, minutes
  const days = Math.floor(difference / millisecondsPerDay);
  difference -= days * millisecondsPerDay;

  const hours = Math.floor(difference / millisecondsPerHour);
  difference -= hours * millisecondsPerHour;

  const minutes = Math.floor(difference / millisecondsPerMinute);

  // Format the result
  let result = "";
  if (days > 0) {
    result += `${days} day${days > 1 ? "s" : ""}`;
  } else {
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      result += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  }

  return result.trim();
};
