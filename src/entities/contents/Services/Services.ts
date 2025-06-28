import { httpClient } from "src/shared/api/http";
import { LatestContentsResponse } from "../types/contents.type";

export const fetchLatestContents = async () => {
  const response = await httpClient.get<LatestContentsResponse>("/contents/latest");
  return response.data;
};
