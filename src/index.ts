import crypto from 'crypto';
import bcrypt from 'bcryptjs';

type HashType = 'md5' | 'bcrypt';

interface MigrationResult {
  success: boolean;
  migrated?: boolean;
  newHash?: string;
  newHashType?: 'bcrypt';
}

export async function verifyAndMigrate(
  inputPassword: string,
  storedHash: string,
  hashType: HashType = 'md5'
): Promise<MigrationResult> {
  if (hashType === 'md5') {
    const md5Hash = crypto.createHash('md5').update(inputPassword).digest('hex');
    if (md5Hash === storedHash) {
      const newBcrypt = await bcrypt.hash(inputPassword, 10);
      return {
        success: true,
        migrated: true,
        newHash: newBcrypt,
        newHashType: 'bcrypt'
      };
    }
  }

  if (hashType === 'bcrypt') {
    const valid = await bcrypt.compare(inputPassword, storedHash);
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
