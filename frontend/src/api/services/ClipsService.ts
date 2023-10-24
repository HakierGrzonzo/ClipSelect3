/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClipsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Simple Caption
     * @param seriesName
     * @param season
     * @param episodeOrdinal
     * @param captionOrdinal
     * @param format
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSimpleCaptionApiClipsSeriesNameSeasonEpisodeOrdinalCaptionOrdinalSimpleGet(
        seriesName: string,
        season: number,
        episodeOrdinal: number,
        captionOrdinal: number,
        format: string = 'webm',
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/clips/{series_name}/{season}/{episode_ordinal}/{caption_ordinal}/simple',
            path: {
                'series_name': seriesName,
                'season': season,
                'episode_ordinal': episodeOrdinal,
                'caption_ordinal': captionOrdinal,
            },
            query: {
                'format': format,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Multi Caption
     * @param seriesName
     * @param season
     * @param episodeOrdinal
     * @param captionOrdinalStart
     * @param captionOrdinalEnd
     * @returns any Successful Response
     * @throws ApiError
     */
    public getMultiCaptionApiClipsSeriesNameSeasonEpisodeOrdinalCaptionOrdinalStartCaptionOrdinalEndMultiGet(
        seriesName: string,
        season: number,
        episodeOrdinal: number,
        captionOrdinalStart: number,
        captionOrdinalEnd: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/clips/{series_name}/{season}/{episode_ordinal}/{caption_ordinal_start}/{caption_ordinal_end}/multi',
            path: {
                'series_name': seriesName,
                'season': season,
                'episode_ordinal': episodeOrdinal,
                'caption_ordinal_start': captionOrdinalStart,
                'caption_ordinal_end': captionOrdinalEnd,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
