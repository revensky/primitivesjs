/**
 * Provides functionality common to all JavaScript objects.
 */
export default class NodeObject extends Object {
  /**
   * Removes null and undefined values from the properties of an object or an array of objects.
   *
   * @param data Object or array of objects to be cleansed.
   * @returns Provided object without null and undefined properties.
   */
  public static removeNullishValues<T = unknown>(data: T): T {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    Object.entries(data).forEach(([key, value]) => {
      switch (true) {
        case value == null:
          Reflect.deleteProperty(data, key);
          break;

        case Array.isArray(value):
          value = value.filter((v: any) => v != null);
          value.forEach(NodeObject.removeNullishValues);
          Reflect.set(data, key, value);
          break;

        case typeof value === 'object':
          NodeObject.removeNullishValues(value);
          Reflect.set(data, key, value);
          break;

        default:
          break;
      }
    });

    return data;
  }

  /**
   * Checks if the provided data is a Plain Javascript Object.
   *
   * @param data Object to be checked.
   * @returns The provided data is a Plain Javascript Object.
   */
  public static isPlain(data: unknown): data is object {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    const proto = Object.getPrototypeOf(data);

    return proto === null || proto === Object.prototype;
  }
}
