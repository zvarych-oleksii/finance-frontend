import * as jose from "jose";

export const generateToken = async (iss: string, secret: string, username: string)  => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    }

    const accessPayload = {
        iss: iss,
        sub: username,
        exp: Math.round(Date.now() / 1000) + 60
    }


    const refreshPayload = {
        iss: iss,
        sub: username,
        exp: Math.round(Date.now() / 1000) + 60
    }

    const jwtTokens = {
        accessToken: await new jose.SignJWT(accessPayload)
            .setProtectedHeader(header)
            .sign(new TextEncoder().encode(secret)),
        refreshToken: await new jose.SignJWT(refreshPayload)
            .setProtectedHeader(header)
            .sign(new TextEncoder().encode(secret))
    }

    return jwtTokens;
}
