// bufferUtil.js
let Buffer;
if (typeof window !== 'undefined') {
    // 在浏览器环境中，使用npm的buffer包
    Buffer = require('buffer/').Buffer;
} else {
    // 在Node.js环境中，使用原生Buffer
    Buffer = global.Buffer;
}

module.exports = Buffer;
