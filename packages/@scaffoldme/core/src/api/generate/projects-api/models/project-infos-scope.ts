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



/**
 * 
 * @export
 * @interface ProjectInfosScope
 */
export interface ProjectInfosScope {
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof ProjectInfosScope
     */
    where?: { [key: string]: object; };
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof ProjectInfosScope
     */
    fields?: { [key: string]: object; };
    /**
     * 
     * @type {number}
     * @memberof ProjectInfosScope
     */
    offset?: number;
    /**
     * 
     * @type {number}
     * @memberof ProjectInfosScope
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof ProjectInfosScope
     */
    skip?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProjectInfosScope
     */
    order?: Array<string>;
}


