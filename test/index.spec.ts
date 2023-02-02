import { encode,decode, md5 } from '../src/utils/ps'

describe("utils", () => {
  it("md5('123456') equal e10adc3949ba59abbe56e057f20f883e", () => {
    expect(md5('123456')).toEqual('e10adc3949ba59abbe56e057f20f883e');
  });

  it("encode('123456') equal dvo/9oqI638sDxtvWmNcKQ==", () => {
    expect(encode('123456')).toEqual('dvo/9oqI638sDxtvWmNcKQ==');
  });

  it("decode('dvo/9oqI638sDxtvWmNcKQ==') equal 123456", () => {
    expect(decode('dvo/9oqI638sDxtvWmNcKQ==')).toEqual('123456');
  });
});