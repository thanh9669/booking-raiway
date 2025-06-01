import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901"); // 32 bytes
const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 bytes

export function decryptAES(ciphertextBase64) {
  const decrypted = CryptoJS.AES.decrypt(ciphertextBase64, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryptAES(plaintext) {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });

  return encrypted.toString(); // Base64
}
