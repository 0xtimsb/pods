import { UserInput } from "../inputs/UserInput";

export const validateUserInput = ({ email, username, password }: UserInput) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return [
      {
        field: "email",
        message: "Invalid email.",
      },
    ];
  }

  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  if (!usernameRegex.test(username)) {
    return [
      {
        field: "username",
        message:
          "Username can only use letters, numbers, underscores and periods.",
      },
    ];
  } else if (username.length < 4 || username.length > 20) {
    return [
      {
        field: "username",
        message: "Username must be of 4 to 32 characters.",
      },
    ];
  }

  if (password.length < 6) {
    return [
      {
        field: "password",
        message: "Password must be 6 or more in length.",
      },
    ];
  }

  return null;
};
