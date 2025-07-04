/**
 * JSON Reviver function that prevents prototype and constructor pollution.
 */
function stripForbiddenProperties(key: string, value: any, reviver?: (this: any, key: string, value: any) => any): any {
  if (key === '__proto__' || key === 'constructor') {
    return;
  }

  return typeof reviver === 'function' ? reviver(key, value) : value;
}

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 * @returns Parsed object from the JSON string.
 */
export function parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
  return JSON.parse(text, (key, value) => stripForbiddenProperties(key, value, reviver));
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns Stringified object.
 */
export function stringify(
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number,
): string;

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns Stringified object.
 */
export function stringify(value: any, replacer?: (string | number)[] | null, space?: string | number): string;

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results or an array of strings and numbers that acts
 * as an approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns Stringified object.
 */
export function stringify(value: any, replacer?: any, space?: string | number): string {
  return JSON.stringify(value, replacer, space);
}
