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
import { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { RequestArgs, BaseAPI } from '../base';
import { NewTechnology } from '../models';
import { Technology } from '../models';
import { TechnologyPartial } from '../models';
import { TechnologyWithRelations } from '../models';
import { Version } from '../models';
/**
 * TechnologyControllerApi - axios parameter creator
 * @export
 */
export declare const TechnologyControllerApiAxiosParamCreator: (configuration?: Configuration | undefined) => {
    /**
     *
     * @param {NewTechnology} [newTechnology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreate(newTechnology?: NewTechnology | undefined, options?: any): RequestArgs;
    /**
     *
     * @param {number} id
     * @param {Version} [version]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreateVersion(id: number, version?: Version | undefined, options?: any): RequestArgs;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerDeleteById(id: number, options?: any): RequestArgs;
    /**
     *
     * @param {object} [filter]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFind(filter?: object | undefined, options?: any): RequestArgs;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFindById(id: number, options?: any): RequestArgs;
    /**
     *
     * @param {number} id
     * @param {Technology} [technology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerReplaceById(id: number, technology?: Technology | undefined, options?: any): RequestArgs;
    /**
     *
     * @param {number} id
     * @param {TechnologyPartial} [technologyPartial]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerUpdateById(id: number, technologyPartial?: TechnologyPartial | undefined, options?: any): RequestArgs;
};
/**
 * TechnologyControllerApi - functional programming interface
 * @export
 */
export declare const TechnologyControllerApiFp: (configuration?: Configuration | undefined) => {
    /**
     *
     * @param {NewTechnology} [newTechnology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreate(newTechnology?: NewTechnology | undefined, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Version} [version]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreateVersion(id: number, version?: Version | undefined, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerDeleteById(id: number, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<void>;
    /**
     *
     * @param {object} [filter]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFind(filter?: object | undefined, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<TechnologyWithRelations[]>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFindById(id: number, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Technology} [technology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerReplaceById(id: number, technology?: Technology | undefined, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {TechnologyPartial} [technologyPartial]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerUpdateById(id: number, technologyPartial?: TechnologyPartial | undefined, options?: any): (axios?: AxiosInstance | undefined, basePath?: string | undefined) => AxiosPromise<void>;
};
/**
 * TechnologyControllerApi - factory interface
 * @export
 */
export declare const TechnologyControllerApiFactory: (configuration?: Configuration | undefined, basePath?: string | undefined, axios?: AxiosInstance | undefined) => {
    /**
     *
     * @param {NewTechnology} [newTechnology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreate(newTechnology?: NewTechnology | undefined, options?: any): AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Version} [version]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerCreateVersion(id: number, version?: Version | undefined, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerDeleteById(id: number, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {object} [filter]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFind(filter?: object | undefined, options?: any): AxiosPromise<TechnologyWithRelations[]>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerFindById(id: number, options?: any): AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Technology} [technology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerReplaceById(id: number, technology?: Technology | undefined, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {TechnologyPartial} [technologyPartial]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    technologyControllerUpdateById(id: number, technologyPartial?: TechnologyPartial | undefined, options?: any): AxiosPromise<void>;
};
/**
 * TechnologyControllerApi - object-oriented interface
 * @export
 * @class TechnologyControllerApi
 * @extends {BaseAPI}
 */
export declare class TechnologyControllerApi extends BaseAPI {
    /**
     *
     * @param {NewTechnology} [newTechnology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerCreate(newTechnology?: NewTechnology, options?: any): AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Version} [version]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerCreateVersion(id: number, version?: Version, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerDeleteById(id: number, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {object} [filter]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerFind(filter?: object, options?: any): AxiosPromise<TechnologyWithRelations[]>;
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerFindById(id: number, options?: any): AxiosPromise<Technology>;
    /**
     *
     * @param {number} id
     * @param {Technology} [technology]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerReplaceById(id: number, technology?: Technology, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {number} id
     * @param {TechnologyPartial} [technologyPartial]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TechnologyControllerApi
     */
    technologyControllerUpdateById(id: number, technologyPartial?: TechnologyPartial, options?: any): AxiosPromise<void>;
}
