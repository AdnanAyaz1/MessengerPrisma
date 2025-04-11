

import { User } from "@prisma/client";
import { fetchHandler } from "./handlers/fetchHandler";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
export const api = {
  auth: {
    registor: (userData: Partial<User>) =>
      fetchHandler(`${API_BASE_URL}/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    log_in: (userData: Partial<User>) =>
      fetchHandler(`${API_BASE_URL}/auth/sign-in`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    check_username: (username: string) =>
      fetchHandler(`${API_BASE_URL}/auth/sign-up/username`, {
        method: "POST",
        body: JSON.stringify(username),
      }),
    update_user: (userData: Partial<User>) =>
      fetchHandler(`${API_BASE_URL}/users/update-user`, {
        method: "PATCH",
        body: JSON.stringify(userData),
      }),
  },
};
