import axios from "axios";

export const signUpUser = async (
  username: string,
  password: string,
  name: string
) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/user/signup",
      {
        username,
        password,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      const user = (await res.data) as { user_id: string; success: boolean };
      return user;
    }

    return { user_id: "User already exists", success: false };
  } catch (_) {
    return { user_id: "Internal server error", success: false };
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/user/signin",
      {
        username: email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const data = (await res.data) as { jwt: string };

    if (data.jwt.length > 0) {
      return { jwt: data.jwt, success: true };
    }

    return { jwt: "User not found", success: false };
  } catch (_) {
    return { jwt: "Internal server error", success: false };
  }
};

export const signOutUser = async () => {
  await axios.post(
    "http://localhost:3001/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
