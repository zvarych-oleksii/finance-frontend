'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NewUser, NewUserCredentials } from '@/src/lib/types/user';
import authService from '@/src/lib/services/AuthService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: NewUser | null;
    authorize: () => Promise<void>;
    login: (credentials: NewUserCredentials) => Promise<NewUser | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within AuthContext');
    }

    return authContext;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<NewUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authorize = useCallback(async () => {
        try {
            const data = await authService.authorization();
            if (data) {
                setIsAuthenticated(true)
            }
            else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false)
        }
    }, []);

    const login = async (credentials: NewUserCredentials) => {
        try {
            await authService.login(credentials);
            const user = await authService.fetchMe();
            await authorize()
            setUser(user);
            return user;
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const authorizeUser = async () => {
            await authorize();
        };

        authorizeUser();
    }, [authorize]);

    return (
        <AuthContext.Provider value={{isAuthenticated, user, authorize, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
