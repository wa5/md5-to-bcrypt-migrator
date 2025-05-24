"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndMigrate = verifyAndMigrate;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function verifyAndMigrate(inputPassword_1, storedHash_1) {
    return __awaiter(this, arguments, void 0, function* (inputPassword, storedHash, hashType = 'md5') {
        if (hashType === 'md5') {
            const md5Hash = crypto_1.default.createHash('md5').update(inputPassword).digest('hex');
            if (md5Hash === storedHash) {
                const newBcrypt = yield bcryptjs_1.default.hash(inputPassword, 10);
                return {
                    success: true,
                    migrated: true,
                    newHash: newBcrypt,
                    newHashType: 'bcrypt'
                };
            }
        }
        if (hashType === 'bcrypt') {
            const valid = yield bcryptjs_1.default.compare(inputPassword, storedHash);
            if (valid) {
                return {
                    success: true,
                    migrated: false,
                    newHash: storedHash,
                    newHashType: 'bcrypt'
                };
            }
        }
        return { success: false };
    });
}
// verifyAndMigrate("test","098f6bcd4621d373cade4e832627b4f6").then((a:any)=>{
//   console.log(a)
// })
// import cryptoC from 'crypto';
// import bcrypt from 'bcryptjs';
// async function verifyAndMigrate(inputPassword:any, storedHash:any, hashType = 'md5') {
//   if (hashType === 'md5') {
//     const md5Hash = cryptoC.createHash('md5').update(inputPassword).digest('hex');
//     if (md5Hash === storedHash) {
//       const newBcrypt = await bcrypt.hash(inputPassword, 10);
//       return {
//         success: true,
//         migrated: true,
//         newHash: newBcrypt,
//         newHashType: 'bcrypt'
//       };
//     }
//   }
//   if (hashType === 'bcrypt') {
//     const valid = await bcrypt.compare(inputPassword, storedHash);
//     if (valid) {
//       return {
//         success: true,
//         migrated: false,
//         newHash: storedHash,
//         newHashType: 'bcrypt'
//       };
//     }
//   }
//   return { success: false };
// }
// // verifyAndMigrate("test","098f6bcd4621d373cade4e832627b4f6").then((a:any)=>{
// //   console.log(a)
// // })
// module.exports = { verifyAndMigrate };
//# sourceMappingURL=index.js.map