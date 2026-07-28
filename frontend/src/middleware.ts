// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access_token')?.value;
//   const { pathname } = request.nextUrl;

//   const publicRoutes = ['/login', '/register', '/verify-email'];
//   const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

//   if (!token && !isPublic) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (token && isPublic) {
//     try {
//       const decoded: any = jwtDecode(token);
//       const role = decoded.role || 'user';
//       return NextResponse.redirect(new URL(`/${role}`, request.url));
//     } catch (e) {
//       const response = NextResponse.redirect(new URL('/login', request.url));
//       response.cookies.delete('access_token');
//       response.cookies.delete('user');
//       return response;
//     }
//   }

//   if (token && pathname.startsWith('/admin')) {
//     try {
//       const decoded: any = jwtDecode(token);
//       if (decoded.role !== 'admin') {
//         return NextResponse.redirect(new URL('/user', request.url));
//       }
//     } catch (e) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // ✅ Public routes (no login required)
  const publicRoutes = [
    '/', 
    '/login', 
    '/register', 
    '/verify-email',
    '/features',
    '/pricing',
    '/about',
    '/contact',
  ];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if not authenticated and trying to access protected route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access public auth pages, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/register' || pathname === '/verify-email')) {
    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role || 'user';
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Admin route protection
  if (token && pathname.startsWith('/admin')) {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/user', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};