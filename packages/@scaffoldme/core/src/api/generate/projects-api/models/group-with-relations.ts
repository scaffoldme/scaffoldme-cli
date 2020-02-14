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


import { GroupUserRoleWithRelations } from './group-user-role-with-relations';

/**
 * (Schema options: { includeRelations: true })
 * @export
 * @interface GroupWithRelations
 */
export interface GroupWithRelations {
    /**
     * 
     * @type {number}
     * @memberof GroupWithRelations
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof GroupWithRelations
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof GroupWithRelations
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof GroupWithRelations
     */
    updatedAt?: Date;
    /**
     * 
     * @type {Array<GroupUserRoleWithRelations>}
     * @memberof GroupWithRelations
     */
    groupUserRoles?: Array<GroupUserRoleWithRelations>;
}


