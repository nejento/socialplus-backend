import { jest } from '@jest/globals';

describe('Basic Test Setup', () => {
  it('should run basic test successfully', () => {
    expect(1 + 1).toBe(2);
  });

  it('should work with mocks', () => {
    const mockFn = jest.fn();
    mockFn.mockReturnValue('test');

    expect(mockFn()).toBe('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
