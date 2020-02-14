/**
 * @scaffoldme-microservices/projects-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.17-alpha.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { RequestArgs, BaseAPI } from '../base';
import { PingResponse } from '../models';
/**
 * PingControllerApi - axios parameter creator
 * @export
 */
export declare const PingControllerApiAxiosParamCreator: (configuration?: Configuration | undefined) => {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingControllerPing(options?: any): RequestArgs;
};
/**
 * PingControllerApi - functional programming interface
 * @export
 */
export declare const PingControllerApiFp: (configuration?: Configuration | undefined) => {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingControllerPing(options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<PingResponse>;
};
/**
 * PingControllerApi - factory interface
 * @export
 */
export declare const PingControllerApiFactory: (configuration?: Configuration | undefined, basePath?: string | undefined, axios?: AxiosInstance | undefined) => {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pingControllerPing(options?: any): AxiosPromise<PingResponse>;
};
/**
 * PingControllerApi - object-oriented interface
 * @export
 * @class PingControllerApi
 * @extends {BaseAPI}
 */
export declare class PingControllerApi extends BaseAPI {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PingControllerApi
     */
    pingControllerPing(options?: any): AxiosPromise<PingResponse>;
}
