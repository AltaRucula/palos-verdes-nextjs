const processEnv = process.env;

export const { MONGODB_URI = 'mongodb://127.0.0.1:27017/test', SESSION_SECRET = 'secret' } = processEnv;

export const PASSWORD_SALT_OR_ROUND = processEnv.PASSWORD_SALT_OR_ROUND
    ? Number(processEnv.PASSWORD_SALT_OR_ROUND)
    : 10;
