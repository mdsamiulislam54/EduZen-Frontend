import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, jwtUtils } from "./lib/jwt/jwtUtlis";
import { Role, routeOwner } from "./lib/auth/authUtils";

export async function proxy(req: NextRequest) {
    try {
        const { pathname } = req.nextUrl;
        const accessToken = req.cookies.get("accessToken")?.value;
        const refreshToken = req.cookies.get("refreshToken")?.value;
        const isValidAccessToken = accessToken
            ? jwtUtils.verifyToken<JwtPayload>(accessToken, process.env.NEXT_PUBLIC_JWT_SCRECT!)
            : null;

        // 3️⃣ Decode access token for quick info
        const decodedAccessToken = accessToken ? jwtUtils.decodeToken<JwtPayload>(accessToken) : null;

        // 4️⃣ Extract user info if token is valid
        let user: JwtPayload | undefined;
        if (isValidAccessToken?.success) {
            user = isValidAccessToken.data;
        }

        // if (!user) {
        //     return NextResponse.redirect(new URL("/auth/login", req.url));
        // }

        const roleFromPath = routeOwner(pathname); // returns Role or 'null'

        if (pathname === "/dashboard") {
            return NextResponse.redirect(
                new URL(`/dashboard/${user?.role.toLowerCase()}`, req.url)
            );
        }
        if (roleFromPath && roleFromPath.toLowerCase() !== user.role.toLowerCase()) {
            return NextResponse.redirect(
                new URL(`/dashboard/${user?.role.toLowerCase()}`, req.url)
            );
        }

        if (pathname === "/create-coaching" && !user?.hasSubscription) {
            return NextResponse.redirect(new URL("/pricing", req.url));
        }

        return NextResponse.next();

    } catch (error) {
        console.error("Proxy middleware error:", error);
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: [
        '/about',
        '/dashboard/:path*',
        '/create-coaching',
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};