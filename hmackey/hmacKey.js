const crypto = require("crypto");
class HmacKey {
  constructor() {
    if (HmacKey.instance) {
      return HmacKey.instance;
    }
    HmacKey.instance = this;
  }
  generateHMACKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  computeHMAC(move, key) {
    const hmac = crypto.createHmac("SHA3-256", key);
    hmac.update(move);
    return hmac.digest("hex");
  }
}
module.exports = HmacKey;
