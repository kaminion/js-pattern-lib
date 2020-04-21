const header = {
    "typ" : "JWT",
    "alg" : "HS256"
};

// // string형태로 보냄
const parseHeader = JSON.stringify(header)
const encodedHeader = Buffer.alloc(parseHeader.length, parseHeader)
                       .toString('base64')
                       .replace('=', '');

// console.log(encodedPayload);

const crypto = require('crypto');

const payload = {
    "iss": "velopert.com",
    "exp": "1485270000000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "velopert"
};

const parsePayload = JSON.stringify(payload);
const encodedPayload = Buffer.alloc(parsePayload.length, parsePayload)
                        .toString('base64')
                        .replace('=', '');
// = 는 패딩문자, 지워줘도상관없다. JWT가 URL로 전달될 때 오류 방지하기 위함
//console.log(encodedPayload);

const signature = crypto.createHmac('sha256', 'secret')
                        .update(encodedHeader + '.' + encodedPayload)
                        .digest('base64')
                        .replace('=', '');

//console.log(signature);

//signature는 suga라고도 한다.

// 최종토큰

console.log(`${encodedHeader}.${encodedPayload}.${signature}`);