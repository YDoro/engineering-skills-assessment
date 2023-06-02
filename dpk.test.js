const { deterministicPartitionKey } = require("./dpk");

jest.mock("crypto", () => {
  const originalModule = jest.requireActual("crypto");
  return {
    __esModule: true,
    ...originalModule,
    createHash: (alg) => ({
      update: (data) => ({ digest: (anything) => "hashed" + data }),
    }),
  };
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const SUT = deterministicPartitionKey();
    expect(SUT).toBe("0");
  });

  it("should return the given key it it is lower than 256", () => {
    const fakeKey = "mockedPartitionKey";
    const SUT = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(SUT).toEqual(fakeKey);
  });

  it("should return the hashed object if the event has no partitionKey", () => {
    const fakeEvent = { anytthing: "mockedPartitionKey" };
    const SUT = deterministicPartitionKey(fakeEvent);
    expect(SUT).toEqual("hashed"+JSON.stringify(fakeEvent));
  });

  it("should return hash even if an object is given", () => {
    const fakeKey = { loren: "ipsun" };
    const SUT = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(SUT).toEqual(JSON.stringify(fakeKey));
  });

  it("should return a hash if fakeKey is greater than 256", () => {
    const fakeKey =
      "mockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKeymockedPartitionKey";
    const SUT = deterministicPartitionKey({ partitionKey: fakeKey });
    expect(SUT).toEqual("hashed" + fakeKey);
  });
});
