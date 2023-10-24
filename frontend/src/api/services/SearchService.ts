/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Search Series
     * @param seriesName
     * @param query
     * @returns SearchResult Successful Response
     * @throws ApiError
     */
    public searchSeriesApiSearchSeriesNameGet(
        seriesName: string,
        query: string,
    ): CancelablePromise<Array<SearchResult>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/search/{series_name}',
            path: {
                'series_name': seriesName,
            },
            query: {
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
