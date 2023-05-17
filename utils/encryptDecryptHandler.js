const CryptoJS = require("crypto-js");

function encryptData(data, secretKey) {
  const cipherText = CryptoJS.AES.encrypt(data, secretKey).toString();
  return cipherText;
}
function decryptData(encryptedData, secretKey) {
  const plainText = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return plainText;
}
module.exports = {
  encryptData,
  decryptData,
};
