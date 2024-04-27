import { identity } from './identity';

describe('identity', () => {
  it('returns the same value', () => {
    // Arrange
    const x = 'Hello Jasmine!';

    // Act
    const y = identity(x);

    // Assert
    expect(y).toBe('Hello Jasmine!');
  });
});
