const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return the given key it it is lower than 256", () => {
    const fakeKey = "mockedPartitionKey"
    const trivialKey = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(trivialKey).toBe(fakeKey);
  })
});
