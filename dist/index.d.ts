type HashType = 'md5' | 'bcrypt';
interface MigrationResult {
    success: boolean;
    migrated?: boolean;
    newHash?: string;
    newHashType?: 'bcrypt';
}
export declare function verifyAndMigrate(inputPassword: string, storedHash: string, hashType?: HashType): Promise<MigrationResult>;
export {};
