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


import { CompatibleVersionWithRelations } from './compatible-version-with-relations';
import { TechnologyWithRelations } from './technology-with-relations';

/**
 * (Schema options: { includeRelations: true })
 * @export
 * @interface VersionWithRelations
 */
export interface VersionWithRelations {
    /**
     * 
     * @type {number}
     * @memberof VersionWithRelations
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof VersionWithRelations
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof VersionWithRelations
     */
    releaseDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof VersionWithRelations
     */
    technologyId?: number;
    /**
     * 
     * @type {TechnologyWithRelations}
     * @memberof VersionWithRelations
     */
    technology?: TechnologyWithRelations;
    /**
     * 
     * @type {Array<CompatibleVersionWithRelations>}
     * @memberof VersionWithRelations
     */
    compatibleVersions?: Array<CompatibleVersionWithRelations>;
}


