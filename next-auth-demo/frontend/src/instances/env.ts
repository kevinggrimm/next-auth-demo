export const env = {
    email: {
        service: 'Gmail',
        signature: process.env.EMAIL_SERVER_SIGNATURE as string,
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string, 10),
        auth: {
            user: process.env.EMAIL_SERVER_USER as string,
            pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
    },

    auth: {
        secret: process.env.NEXTHAUTH_SECRET as string,
        url: process.env.NEXTAUTH_URL as string,
        emails: (process.env.AUTH_AUTHORIZED_EMAILS as string).split(','),
    },

    get emailProvider() {
        const { email } = this;
        return {
            server: `smtp://${email.auth.user}:${email.auth.pass}@${email.host}:${email.port}`,
            from: email.signature,
        };
    },

    aws: {
        region: process.env.AWS_REGION as string,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        tableName: process.env.NEXAUTH_TABLE_NAME as string,
    },
    
} as const;