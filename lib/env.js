import * as dotenv from "dotenv";
dotenv.config();
export class EnvManager {
    envValues = {};
    constructor(entries) {
        for (const entry of entries) {
            const envValue = process.env[entry.key];
            if (envValue !== undefined) {
                this.envValues[entry.key] = entry.handler
                    ? entry.handler(envValue)
                    : envValue;
            }
            else {
                throw new Error(`Environment variable ${entry.key} is not defined`);
            }
        }
        Object.keys(this.envValues).forEach((key) => {
            // @ts-ignore to allow dynamic key creation
            this[key] = this.envValues[key];
        });
    }
    get(key) {
        const value = this.envValues[key];
        if (value !== undefined) {
            return value;
        }
        throw new Error(`Environment variable ${key} was not found and/or custom handler returned undefined`);
    }
    getAll() {
        return this.envValues;
    }
}
export const envManager = new EnvManager([
    {
        key: "S3_BUCKET_NAME",
        handler(envName) {
            return "bbb";
        },
    },
    {
        key: "S3_ENDPOINT",
    },
    {
        key: "AWS_REGION",
    },
    {
        key: "AWS_SECRET_ACCESS_KEY",
    },
    {
        key: "AWS_ACCESS_KEY_ID",
    },
    {
        key: "BUCKET_NAME"
    },
    {
        key: "KEYCLOAK_URL"
    },
    {
        key: "KC_ADMIN_USERNAME"
    },
    {
        key: "KC_ADMIN_PASSWORD"
    },
    {
        key: "KC_CLIENT_ID"
    }
]);
//# sourceMappingURL=env.js.map