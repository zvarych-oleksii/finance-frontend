import { NextRequest, NextResponse } from 'next/server';
import authService from '@/src/lib/services/AuthService';

export async function middleware(req: NextRequest) {
    const protectedRoutes: string[] = ['/uikit'];

    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        const cookies = req.cookies;

        const isAuthorized = await authService.authorization(cookies);

        if (!isAuthorized) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}
