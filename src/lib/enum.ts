/**
 * Generic Enum Type.
 */
export type EnumType = Record<string, string | number>;

/**
 * Returns the keys of the Enum.
 *
 * @param enumObj Enum object to be inspected.
 * @returns Collection of the keys of the Enum.
 */
export function getKeys<T extends EnumType>(enumObj: T): (keyof T)[] {
  return Object.keys(enumObj).filter((key) => Number.isNaN(Number(key)));
}

/**
 * Returns the key of the first Enum member that represents the provided value.
 *
 * @param enumObj Enum object to be inspected.
 * @param value Value to be searched.
 * @returns Key of the first Enum member based on the provided value.
 */
export function getKey<T extends EnumType>(enumObj: T, value: string | number): keyof T | null {
  return getKeys(enumObj).find((key) => enumObj[key] === value) ?? null;
}

/**
 * Checks if the provided Enum has the provided key as its member.
 *
 * @param enumObj Enum object to be inspected.
 * @param key Key to be checked.
 * @returns Whether the provided Enum has the provided key as its member.
 */
export function hasKey<T extends EnumType>(enumObj: T, key: keyof T): key is keyof T {
  return getKeys(enumObj).includes(key);
}

/**
 * Returns the values of the Enum.
 *
 * @param enumObj Enum object to be inspected.
 * @returns Collection of the Values of the Enum.
 */
export function getValues<T extends EnumType>(enumObj: T): T[keyof T][] {
  return getKeys(enumObj).map((key) => enumObj[key]);
}

/**
 * Returns the value of the Enum represented by the provided key.
 *
 * @param key Key used to retrieve the value of the Enum.
 * @returns Value of the Enum represented by the provided key.
 */
export function getValue<T extends EnumType>(enumObj: T, key: keyof T): T[keyof T] | null {
  return <T[keyof T]>enumObj[key] ?? null;
}

/**
 * Checks if the provided Enum has the provided value as its member.
 *
 * @param enumObj Enum object to be inspected.
 * @param value Value to be checked.
 * @returns Whether the provided Enum has the provided value as its member.
 */
export function hasValue<T extends EnumType>(enumObj: T, value: string | number): value is T[keyof T] {
  return getKey(enumObj, value) !== null;
}

/**
 * Converts the provided value into a member of the provided Enum.
 *
 * @param enumObj Enum object to be inspected.
 * @param value Value to be searched.
 * @returns Enum member based on the provided value.
 */
export function parse<T extends EnumType>(enumObj: T, value: string | number): T[keyof T] | null {
  return getValues(enumObj).find((attr) => attr === value) ?? null;
}

/**
 * Returns the entries of the provided Enum.
 *
 * @param enumObj Enum object to be inspected.
 * @returns Entries of the provided Enum.
 */
export function getEntries<T extends EnumType>(enumObj: T): [keyof T, T[keyof T]][] {
  return getKeys(enumObj).map((key) => [key, enumObj[key]]);
}
