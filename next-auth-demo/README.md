## Next Auth Demo

1. Run `npm install` in `next-auth-demo` to install SST and other packages.
2. Run `npm install` in `next-auth-demo/frontend` to install the frontend packages.
3. Run `npx sst deploy --stage dev` in `next-auth-demo` to deploy to production

## Note on Credentials
- You need an AWS account to run the app
- The `.env` file requires credentials for AWS + SMPT that are defined in `src/instances/env.ts`

## Note on Table Name
- The `NEXTAUTH_TABLE_NAME` will be visible after deploying the stack
- You can also run locally with `npx sst start --stage dev` and the stack outputs will be shown