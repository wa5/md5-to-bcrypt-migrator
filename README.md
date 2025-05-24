# md5-to-bcrypt-migrator

A lightweight Node.js utility to seamlessly migrate legacy MD5-hashed passwords to modern, secure bcrypt hashes during user login — **without disrupting user experience**.

---

## 🚀 Why This Library?

Many legacy systems still store user passwords using MD5, which is insecure by modern standards. This package allows developers to automatically verify an MD5 password and rehash it using bcrypt during a login attempt.

✅ Zero-friction user experience  
✅ No need to ask users to reset passwords  
✅ One-time migration on login  
✅ Lightweight, fast, and simple

---

## 📦 Installation

```bash
npm install md5-to-bcrypt-migrator
```bash
* Working Example with React.JS is as follows:
 ```
 ```bash
 import { verifyAndMigrate } from 'md5-to-bcrypt-migrator';

const login = async (inputPassword: string, storedHash: string, hashType: 'md5' | 'bcrypt') => {
  const result = await verifyAndMigrate(inputPassword, storedHash, hashType);

  if (result.success) {
    if (result.migrated) {
      console.log("Password is valid and migrated to bcrypt.");
      console.log("New bcrypt hash:", result.newHash);

      // You should now update the user's password hash in DB to result.newHash
      // and set hashType to "bcrypt" for future logins.
    } else {
      console.log("Password is valid and already bcrypt.");
    }
  } else {
    console.log("Invalid password");
  }
};
 ```

## 📘 API Reference

### `verifyAndMigrate(inputPassword, storedHash, hashType?)`

| Parameter       | Type     | Required | Description                                                         |
|----------------|----------|----------|---------------------------------------------------------------------|
| `inputPassword`| `string` | ✅       | The plaintext password entered by the user                         |
| `storedHash`   | `string` | ✅       | The stored MD5 or bcrypt hash from your database                   |
| `hashType`     | `string` | ❌       | Optional, defaults to `'md5'`. Use `'md5'` or `'bcrypt'`           |


## 📦 Returns

A `Promise` that resolves to an object:

```ts
{
  success: boolean;         // true if password matched
  migrated?: boolean;       // true if MD5 matched and was migrated
  newHash?: string;         // newly generated bcrypt hash (if migrated)
  newHashType?: 'bcrypt';   // explicitly mentions new hash type
}
## 🛡️ Security Note

**MD5 is broken**: Never store passwords using MD5 in modern applications.

This library is designed to migrate away from MD5, **not** to encourage its continued use.

✅ Always store passwords using strong hash algorithms like `bcrypt` or `Argon2`.

---

## 🌐 Use Case

This utility is ideal if you're:

- Maintaining a legacy app with MD5-hashed passwords
- Upgrading security without forcing users to reset passwords
- Doing backend work in Node.js

---

## 🛠️ Contributing

Contributions and issues are welcome!  
Please see the [issues page](https://github.com/wa5/md5-to-bcrypt-migrator/issues) or open a pull request.

---

## 📄 License

**ISC License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Waseem Ahmed**  
GitHub: [@wa5](https://github.com/wa5)
