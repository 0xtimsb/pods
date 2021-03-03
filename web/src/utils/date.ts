// Converts unix timestamp into a time ago string like 7 hours ago.

export const timeAgo = (unixTimestamp: any) => {
  const date = new Date(parseInt(unixTimestamp));
  const diff = new Date().getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + "y";
  }

  // interval = Math.floor(seconds / 2592000);
  // if (interval > 1) {
  //   return interval + 'month';
  // }

  interval = Math.floor(seconds / 604800);
  if (interval > 1) {
    return interval + "w";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "d";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "m";
  }

  return Math.floor(seconds) + "s";
};

// Converts unix timestamp to current date.
export const currentDate = (unixTimestamp: any) => {
  const date = new Date(parseInt(unixTimestamp));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${month.substr(0, 3)} ${day} at ${time}`;
};

export const months = [
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

export const days = (() => {
  let result = [];
  for (let i = 1; i <= 31; i++) {
    result.push(i);
  }
  return result;
})();

export const years = (() => {
  let result = [];
  for (let i = new Date().getFullYear() - 13; i >= 1919; i--) {
    result.push(i);
  }
  return result;
})();
