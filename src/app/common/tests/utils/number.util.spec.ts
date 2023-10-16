import { getRandom } from '../../utils/number.util';

describe('getRandom', () => {
  let mathRandomSpy: jasmine.Spy;

  beforeAll(() => {
    mathRandomSpy = spyOn(Math, 'random');
  });

  afterEach(() => {
    mathRandomSpy.and.callThrough();
  });

  it('return 1 when start is 1 and end is 1', () => {
    mathRandomSpy.and.returnValue(0);
    const result1 = getRandom(1, 1);
    mathRandomSpy.and.returnValue(1);
    const result2 = getRandom(1, 1);
    expect(result1).toBe(1);
    expect(result2).toBe(1);
  });

  it('return 1 when start is 1 and end is 2 (random: 0)', () => {
    mathRandomSpy.and.returnValue(0);
    const result = getRandom(1, 2);
    expect(result).toBe(1);
  });

  it('return 2 when start is 1 and end is 2 (random: 1)', () => {
    mathRandomSpy.and.returnValue(1);
    const result = getRandom(1, 2);
    expect(result).toBe(2);
  });

  it('return 1 when start is 1 and end is 2 (random: 0.55)', () => {
    mathRandomSpy.and.returnValue(0.5);
    const result = getRandom(1, 2);
    expect(result).toBe(1);
  });
});
