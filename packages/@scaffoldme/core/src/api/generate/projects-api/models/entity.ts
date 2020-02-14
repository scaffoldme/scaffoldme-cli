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


import { Attribute } from './attribute';
import { Relation } from './relation';

/**
 * 
 * @export
 * @interface Entity
 */
export interface Entity {
    /**
     * 
     * @type {string}
     * @memberof Entity
     */
    name: string;
    /**
     * 
     * @type {Array<Attribute>}
     * @memberof Entity
     */
    attributes: Array<Attribute>;
    /**
     * 
     * @type {Array<Relation>}
     * @memberof Entity
     */
    relations: Array<Relation>;
}


