const crypto = require('crypto');

// Encrypt Function with data and key 
function encryptData(data, key) {
  if (!data || !key) {
    throw new Error('Data or encryption key is missing');
  }

  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
}

// Decrypt Function with encrypted data and key
function decryptData(encryptedData, key) {
  if (!encryptedData || !key) {
    throw new Error('Encrypted data or decryption key is missing');
  }

  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encryptData, decryptData };
