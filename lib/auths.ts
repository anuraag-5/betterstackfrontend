import axios from "axios";

export const signUpUser = async (
  username: string,
  password: string,
  name: string
) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/user/signup",
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
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/user/signin",
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
    process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

export const updateEmail = async (new_email: string, user_id: string) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/update_email",
      {
        new_email,
        user_id
      }
    );

    const data = (await res.data) as { success: boolean };

    return data;
  } catch (_) {
    return {success: false};
  }
};

export const updatePassword = async (old_password: string, new_password: string, user_id: string) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/update_password",
      {
        new_password,
        user_id,
        old_password
      }
    );

    const data = (await res.data) as {success: boolean};

    return data;
  } catch (_) {
    return {success: false};
  }
};
