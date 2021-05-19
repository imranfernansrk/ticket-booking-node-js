import * as bcrypt from "bcrypt";

const salt = bcrypt.genSalt(parseInt(process.env.SALT_LEVEL));

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, await salt);
}

export const checkPassword = async (attemptPass: string, hashedPass: string) => {
    return bcrypt.compare(attemptPass, hashedPass);
}