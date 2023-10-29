/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Caption } from "./Caption";
import type { MediaMetaInformation } from "./MediaMetaInformation";

export type Media = {
  file_path: string;
  captions: Array<Caption>;
  name: string;
  ordinal: number;
  meta: MediaMetaInformation;
};
