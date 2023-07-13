export function randomStringEnumValue<T extends object>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }