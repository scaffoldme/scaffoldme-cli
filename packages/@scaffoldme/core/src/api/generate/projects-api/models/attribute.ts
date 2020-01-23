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
 * @interface Attribute
 */
export interface Attribute {
    /**
     * 
     * @type {string}
     * @memberof Attribute
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Attribute
     */
    type?: AttributeTypeEnum;
    /**
     * 
     * @type {boolean}
     * @memberof Attribute
     */
    isRequired: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Attribute
     */
    isUnique: boolean;
    /**
     * 
     * @type {string}
     * @memberof Attribute
     */
    defaultValue?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Attribute
     */
    enumValues?: Array<string>;
}

/**
    * @export
    * @enum {string}
    */
export enum AttributeTypeEnum {
    Any = 'any',
    Boolean = 'boolean',
    Date = 'date',
    DateString = 'dateString',
    Enum = 'enum',
    Number = 'number',
    String = 'string'
}



