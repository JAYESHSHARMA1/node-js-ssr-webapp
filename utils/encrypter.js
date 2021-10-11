const key = process.env.JWT_SECRET;

var CryptoJS = require("crypto-js");


const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, key).toString();
}

// Decrypt
const decrypt = (ciphertext) => {
    return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);;
}

module.exports = {
    encrypt,
    decrypt
};