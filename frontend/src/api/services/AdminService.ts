/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Series } from '../models/Series';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdminService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Register Series
     * @param seriesPath
     * @returns Series Successful Response
     * @throws ApiError
     */
    public registerSeriesAdminRegisterPost(
        seriesPath: string,
    ): CancelablePromise<Series> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/register',
            query: {
                'series_path': seriesPath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Drop All Series
     * @returns any Successful Response
     * @throws ApiError
     */
    public dropAllSeriesAdminDropDelete(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/drop',
        });
    }

}
