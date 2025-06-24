import 'jest-extended';

import Object from './object';

const invalidPlainObjects: unknown[] = [
  undefined,
  null,
  true,
  1,
  1.2,
  1n,
  'a',
  Symbol('a'),
  Buffer,
  Buffer.alloc(1),
  () => 1,
  [],
];

describe('Object', () => {
  describe('removeNullishValues()', () => {
    it('should remove all undefined values from an object.', () => {
      const data: Record<string, unknown>[] = [
        {
          name: 'John Doe',
          occupation: null,
          vehicle: undefined,
          age: 23,
          address: { streetAddress: '123 1st Avenue', referencePoint: null, owner: undefined, trees: ['Oak', null] },
          hobbies: ['Jogging', undefined, { name: 'Gambling', skills: ['Poker', 'Black Jack'] }],
        },
      ];

      expect(() => Object.removeNullishValues(data)).not.toThrow();

      expect(data).toStrictEqual([
        {
          name: 'John Doe',
          age: 23,
          address: { streetAddress: '123 1st Avenue', trees: ['Oak'] },
          hobbies: ['Jogging', { name: 'Gambling', skills: ['Poker', 'Black Jack'] }],
        },
      ]);
    });
  });

  describe('isPlain()', () => {
    it.each(invalidPlainObjects)('should return false when the data is not a plain javascript object.', (data) => {
      expect(Object.isPlain(data)).toBeFalse();
    });

    it.each([{}, Object.create(null)])('should return true when the data is a plain javascript object.', (data) => {
      expect(Object.isPlain(data)).toBeTrue();
    });
  });
});
