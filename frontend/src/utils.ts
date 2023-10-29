import { OpenAPI } from "./api";

export const getApiImageUrl = (suffix: string) => `${OpenAPI.BASE}${suffix}`;
