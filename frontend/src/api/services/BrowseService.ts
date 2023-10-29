/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Caption } from "../models/Caption";
import type { SeasonResponse } from "../models/SeasonResponse";
import type { SeriesResponse } from "../models/SeriesResponse";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class BrowseService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List Series
   * @returns SeriesResponse Successful Response
   * @throws ApiError
   */
  public listSeriesApiSeriesGet(): CancelablePromise<Array<SeriesResponse>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/series",
    });
  }

  /**
   * List Seasons And Episodes
   * @param seriesName
   * @returns SeasonResponse Successful Response
   * @throws ApiError
   */
  public listSeasonsAndEpisodesApiSeriesSeriesNameGet(
    seriesName: string,
  ): CancelablePromise<Array<SeasonResponse>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/series/{series_name}",
      path: {
        series_name: seriesName,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get All Quotes
   * @param seriesName
   * @param seasonOrdinal
   * @param episodeOrdinal
   * @returns Caption Successful Response
   * @throws ApiError
   */
  public getAllQuotesApiSeriesSeriesNameSeasonOrdinalEpisodeOrdinalGet(
    seriesName: string,
    seasonOrdinal: number,
    episodeOrdinal: number,
  ): CancelablePromise<Array<Caption>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/api/series/{series_name}/{season_ordinal}/{episode_ordinal}",
      path: {
        series_name: seriesName,
        season_ordinal: seasonOrdinal,
        episode_ordinal: episodeOrdinal,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
