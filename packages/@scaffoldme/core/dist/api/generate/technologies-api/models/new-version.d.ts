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
/**
 * (Schema options: { title: \'NewVersion\', exclude: [ \'id\' ] })
 * @export
 * @interface NewVersion
 */
export interface NewVersion {
    /**
     *
     * @type {string}
     * @memberof NewVersion
     */
    name: string;
    /**
     *
     * @type {Date}
     * @memberof NewVersion
     */
    releaseDate?: Date;
    /**
     *
     * @type {number}
     * @memberof NewVersion
     */
    technologyId?: number;
}
