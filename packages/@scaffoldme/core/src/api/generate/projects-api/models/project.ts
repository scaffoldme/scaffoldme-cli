// tslint:disable
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


import { Api } from './api';
import { FrontEnd } from './front-end';
import { Service } from './service';
import { Storage } from './storage';

/**
 * 
 * @export
 * @interface Project
 */
export interface Project {
    /**
     * 
     * @type {number}
     * @memberof Project
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    logo?: string;
    /**
     * 
     * @type {Array<FrontEnd>}
     * @memberof Project
     */
    frontEnds: Array<FrontEnd>;
    /**
     * 
     * @type {Array<Api>}
     * @memberof Project
     */
    apis: Array<Api>;
    /**
     * 
     * @type {Array<Storage>}
     * @memberof Project
     */
    storages: Array<Storage>;
    /**
     * 
     * @type {Array<Service>}
     * @memberof Project
     */
    services: Array<Service>;
}


