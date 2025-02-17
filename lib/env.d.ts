type EnvRecord<T extends string> = Record<T, string>;
type EnvEntry<T extends string> = {
    key: T;
    handler?: (envName: string) => string;
};
export declare class EnvManager<T extends string> {
    private envValues;
    constructor(entries: EnvEntry<T>[]);
    get<K extends T>(key: K): string;
    getAll(): EnvRecord<T>;
}
export declare const envManager: EnvManager<"S3_BUCKET_NAME" | "S3_ENDPOINT" | "AWS_REGION" | "AWS_SECRET_ACCESS_KEY" | "AWS_ACCESS_KEY_ID" | "BUCKET_NAME" | "KEYCLOAK_URL" | "KC_ADMIN_USERNAME" | "KC_ADMIN_PASSWORD" | "KC_CLIENT_ID">;
export {};
//# sourceMappingURL=env.d.ts.map