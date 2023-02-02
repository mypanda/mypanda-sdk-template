import { add } from '../src/utils'

describe("utils", () => {
  it("add(1,2) equal 3", () => {
    expect(add(1, 2)).toEqual(3);
  });
});