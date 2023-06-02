const { deterministicPartitionKey } = require("./dpk");

jest.mock("crypto", () => {
  const originalModule = jest.requireActual("crypto");
  return {
    __esModule: true,
    ...originalModule,
    createHash: (alg) => ({
      update: (data) => ({ digest: (antything) => "hashed" + data }),
    }),
  };
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return the given key it it is lower than 256", () => {
    const fakeKey = "mockedPartitionKey";
    const trivialKey = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(trivialKey).toEqual(fakeKey);
  });

  it("should return hash even if an object is given", () => {
    const fakeKey = { loren: "ipsun" };
    const trivialKey = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(trivialKey).toEqual(JSON.stringify(fakeKey));
  });

  it("should return a hash if fakeKey is greater than 256", () => {
    const fakeKey =
      "mockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKey";
    const trivialKey = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(trivialKey).toEqual("hashed" + fakeKey);
  });
});
