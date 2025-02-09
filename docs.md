# ***EnvManager Documentation***

## ***Overview***

***The ****``**** class is a TypeScript utility that loads and manages environment variables, ensuring they are defined and providing an optional transformation handler for specific variables.***

## ***Features***

- ***Automatically loads environment variables using ****``****.***
- ***Validates the existence of required environment variables.***
- ***Supports custom handlers to modify the value of an environment variable.***
- ***Provides methods to retrieve individual or all environment variables.***

## ***Implementation***

### *``*

***A type alias for storing environment variables as key-value pairs:***

```ts
 type EnvRecord<T extends string> = Record<T, string>;
```

### *``*

***Defines the structure of an environment variable entry:***

```ts
type EnvEntry<T extends string> = {
  key: T;
  handler?: (envName: string) => string;
};
```

- *``****: The name of the environment variable.***
- *``**** (optional): A function to transform the value of the environment variable before storing it.***

### *``**** Class***

***The ****``**** class loads and manages environment variables:***

```ts
class EnvManager<T extends string> {
  private envValues: EnvRecord<T> = {} as EnvRecord<T>;

  constructor(entries: EnvEntry<T>[]) {
    for (const entry of entries) {
      const envValue = process.env[entry.key];
      if (envValue !== undefined) {
        this.envValues[entry.key] = entry.handler
          ? entry.handler(envValue)
          : envValue;
      } else {
        throw new Error(`Environment variable ${entry.key} is not defined`);
      }
    }

    Object.keys(this.envValues).forEach((key) => {
      // @ts-ignore to allow dynamic key creation
      this[key] = this.envValues[key];
    });
  }

  get<K extends T>(key: K): string {
    const value = this.envValues[key];
    if (value !== undefined) {
      return value;
    }
    throw new Error(`Environment variable ${key} was not found and/or custom handler returned undefined`);
  }

  getAll(): EnvRecord<T> {
    return this.envValues;
  }
}
```

## ***Usage***

***To use ****``****, define the required environment variables and instantiate the manager:***

### ***Example***

```ts
import * as dotenv from "dotenv";
dotenv.config();

export const envManager = new EnvManager([
  {
    key: "S3_BUCKET_NAME",
    handler(envName) {
      return "bbb";
    },
  },
  { key: "S3_ENDPOINT" },
  { key: "AWS_REGION" },
  { key: "AWS_SECRET_ACCESS_KEY" },
  { key: "AWS_ACCESS_KEY_ID" },
  { key: "BUCKET_NAME" },
  { key: "KEYCLOAK_URL" },
  { key: "KC_ADMIN_USERNAME" },
  { key: "KC_ADMIN_PASSWORD" },
  { key: "KC_CLIENT_ID" },
]);

console.log(envManager.get("S3_BUCKET_NAME")); // Outputs: 'bbb', note there can be whatvere code you want here, for example you could make an axios request to get an env 
console.log(envManager.get("S3_ENDPOINT")) // will return whatever value is in the nev file 
console.log(envManager.getAll()); // Outputs all environment variables
```

## ***Error Handling***

***If an environment variable is missing, an error is thrown:***

```sh
Error: Environment variable S3_BUCKET_NAME is not defined
```

***To resolve this, ensure all required variables are present in the ****`.env`**** file or system environment.***


