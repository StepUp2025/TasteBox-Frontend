import { requestHandler } from "shared/api";
import { localUser, OAuthUser } from "../types/user.type";

export const fetchLocalUser = async () => {
    return await requestHandler<localUser>("get", "/users/profile")
}

export const fetchOAuthUser = async () => {
    return await requestHandler<OAuthUser>("get", "/users/profile")
}