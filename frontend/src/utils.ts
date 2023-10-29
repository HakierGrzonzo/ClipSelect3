import { FRONTEND_URL } from "./constants"

export const getApiImageUrl = (suffix: string) => `${FRONTEND_URL}${suffix}`
