import axios, { AxiosError, AxiosResponse } from 'axios';
import { backendUrl } from '@/src/config/settings';
import { NewUser, NewUserCredentials } from '@/src/lib/types/user';
import { cookies } from 'next/headers'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    public async login(credentials: NewUserCredentials) {
        const username = credentials.username;
        const password = credentials.password;
        try {
            const response: AxiosResponse = await axios.post(`${this.backendUrl}/login`, {
                username,
                password,
            },             {
                headers: {
                    'Content-Type': 'application/json', // Ensure JSON content type
                },
                withCredentials: true,
            });
            const tokens: Tokens = response.data;
            return tokens
        } catch (error) {
            return null;
        }
    }

    public async refresh(refreshToken?: string) {
        try {
            const response = await axios.post(
                `${this.backendUrl}/refresh`,
                {},
                {
                    withCredentials: true,
                    headers: refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {},
                }
            );
            const newTokens: Tokens = response.data;
            return newTokens;
        } catch (error) {
            return null;
        }
    }

    public async logout() {
        try {
            await axios.post(`${this.backendUrl}/logout`, {}, {withCredentials: true});
        } catch (error) {
        }
    }

    public async authorization(cookies?: RequestCookies) {
        try {
            const accessToken = cookies?.get('accessToken')?.value;

            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response: AxiosResponse = await axios.get(`${this.backendUrl}/authorize`, {
                withCredentials: true,
                headers,
            });
            return response.data;
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401 && error.response.data?.detail === 'Access token expired') {
                console.log("hooli")
                const refreshToken = cookies?.get('refreshToken')?.value;
                const newTokens = await this.refresh(refreshToken);

                if (newTokens && newTokens.accessToken) {
                    try {
                        const retryResponse: AxiosResponse = await axios.get(`${this.backendUrl}/authorize`, {
                            withCredentials: true,
                            headers: { Authorization: `Bearer ${newTokens.accessToken}` },
                        });
                        return retryResponse.data;
                    } catch (retryError) {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    public async fetchMe() {
        try {
            const response: AxiosResponse = await axios.get(`${this.backendUrl}/me`, {
                withCredentials: true,
            });
            const user: NewUser = response.data;
            return user
        } catch (error) {
            return null;
        }
    }
}

const authService = Object.freeze(new AuthService(backendUrl));

export default authService;
