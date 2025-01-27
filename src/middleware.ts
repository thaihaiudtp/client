import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const currentPath = request.nextUrl.pathname;

    if (!token && !['/login', '/signup'].includes(currentPath)) {
        // Chuyển hướng đến trang login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Nếu có token hoặc đang ở login/register, tiếp tục
    return NextResponse.next();
}

// Cấu hình matcher: Áp dụng middleware cho tất cả các đường dẫn trong `src/app` trừ `/login` và `/register`
export const config = {
    matcher: [
        '/((?!login|signup|_next|favicon.ico).*)', // Loại trừ login, register, các file tĩnh của Next.js
    ],
};
