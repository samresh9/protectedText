const CryptoJS = require("crypto-js");

function encryptData(note, secretKey) {
  const cipherText = CryptoJS.AES.encrypt(note, secretKey).toString();
  return cipherText;
}
function decryptData(encryptedData, secretKey) {
  const plainText = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return plainText;
}

function hashData(note, secretKey) {
  const hashText = CryptoJS.SHA512(note, secretKey).toString();
  return hashText;
}
function hashSite(siteId) {
  const hashText = CryptoJS.SHA512(siteId).toString();
  return hashText;
}

module.exports = {
  encryptData,
  decryptData,
  hashData,
  hashSite,
};
