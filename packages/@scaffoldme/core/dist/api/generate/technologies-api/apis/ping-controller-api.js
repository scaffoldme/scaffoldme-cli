"use strict";
// tslint:disable
/**
 * LoopBack Application
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const globalImportUrl = tslib_1.__importStar(require("url"));
const axios_1 = tslib_1.__importDefault(require("axios"));
// Some imports not used depending on template conditions
// @ts-ignore
const base_1 = require("../base");
/**
 * PingControllerApi - axios parameter creator
 * @export
 */
exports.PingControllerApiAxiosParamCreator = function (configuration) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options = {}) {
            const localVarPath = `/ping`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = { ...localVarUrlObj.query, ...localVarQueryParameter, ...options.query };
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...options.headers };
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
/**
 * PingControllerApi - functional programming interface
 * @export
 */
exports.PingControllerApiFp = function (configuration) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options) {
            const localVarAxiosArgs = exports.PingControllerApiAxiosParamCreator(configuration).pingControllerPing(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
/**
 * PingControllerApi - factory interface
 * @export
 */
exports.PingControllerApiFactory = function (configuration, basePath, axios) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options) {
            return exports.PingControllerApiFp(configuration).pingControllerPing(options)(axios, basePath);
        },
    };
};
/**
 * PingControllerApi - object-oriented interface
 * @export
 * @class PingControllerApi
 * @extends {BaseAPI}
 */
class PingControllerApi extends base_1.BaseAPI {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PingControllerApi
     */
    pingControllerPing(options) {
        return exports.PingControllerApiFp(this.configuration).pingControllerPing(options)(this.axios, this.basePath);
    }
}
exports.PingControllerApi = PingControllerApi;
