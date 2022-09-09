class Assertion {
  private readonly actual: any;

  constructor(actual: any) {
    this.actual = actual
  }

  isEqualTo = (expected: any) => {
    try {
      expect(this.actual).to.deep.equal(expected);
    } catch (error: any) {
      error.onFail((e: any) => console.log(e));
      throw `Expected: ${JSON.stringify(expected, null, 2)} to be equal to ${JSON.stringify(this.actual, null, 2)}`;
    }
  };
}

export const assertThat = (actual: any) => new Assertion(actual);