if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined in environment variables.');
}
if (!process.env.NEXT_PUBLIC_APPLICATION_NAME) {
    throw new Error('APPLICATION_NAME is not defined in environment variables.');
}
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const applicationName = process.env.NEXT_PUBLIC_APPLICATION_NAME;

