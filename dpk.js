const crypto = require("crypto");

const generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return "0";
  } else {
    let candidate = event.partitionKey || generateHash(JSON.stringify(event));

    candidate =
      typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generateHash(candidate);
    }
    return candidate;
  }
};
