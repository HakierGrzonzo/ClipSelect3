/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AdminService } from './services/AdminService';
import { BrowseService } from './services/BrowseService';
import { ClipsService } from './services/ClipsService';
import { DefaultService } from './services/DefaultService';
import { SearchService } from './services/SearchService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ClipsApi {

    public readonly admin: AdminService;
    public readonly browse: BrowseService;
    public readonly clips: ClipsService;
    public readonly default: DefaultService;
    public readonly search: SearchService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.admin = new AdminService(this.request);
        this.browse = new BrowseService(this.request);
        this.clips = new ClipsService(this.request);
        this.default = new DefaultService(this.request);
        this.search = new SearchService(this.request);
    }
}

