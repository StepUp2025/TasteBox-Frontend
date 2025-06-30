import { authClient } from "shared/api";
import { ProfileUpdateType } from "../types/user.type";

export const fetchLocalUser = async () => {
  const response =  await authClient.get("/users/profile");
  return response.data;
} 

export const updateProfile = async (data: ProfileUpdateType) => {
  const response = await authClient.patch("/users/profile", data);
  return response.data;
}
