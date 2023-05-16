const config = require("config");
const CryptoJS = require("crypto-js");

const secretKey = config.get("encryptionKey.secretKey");

function encryptData(data) {
  const cipherText = CryptoJS.AES.encrypt(data, secretKey).toString();
  return cipherText;
}
function decryptData(encryptedData) {
  const plainText = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return plainText;
}
module.exports = {
  encryptData,
  decryptData,
};
