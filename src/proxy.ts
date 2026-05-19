import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, jwtUtils } from "./lib/jwt/jwtUtlis";
import { Role, routeOwner } from "./lib/auth/authUtils";
import { getNewAccessToken, getOnboardStatus, ICheckOwnerSubscription, isTokenExpiredSoon } from "./service/auth.service";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
    try {
        const refreshResponse = await getNewAccessToken(refreshToken);
        return refreshResponse;

    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;

    }
}
export async function proxy(req: NextRequest) {
    try {
        const { pathname } = req.nextUrl;
        const accessToken = req.cookies.get("accessToken")?.value;
        const refreshToken = req.cookies.get("refreshToken")?.value;
        const isValidAccessToken = accessToken
            ? jwtUtils.verifyToken<JwtPayload>(accessToken, process.env.NEXT_PUBLIC_JWT_SCRECT!)
            : null;


        let user: JwtPayload | undefined;
        if (isValidAccessToken?.success) {
            user = isValidAccessToken.data;
        }

        if (pathname.startsWith("/dashboard") && !user) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        const roleFromPath = routeOwner(pathname);
        if (pathname === "/dashboard") {
            return NextResponse.redirect(
                new URL(`/dashboard/${user?.role.toLowerCase()}`, req.url)
            );
        }
        if (roleFromPath && roleFromPath.toLowerCase() !== user?.role.toLowerCase()) {
            return NextResponse.redirect(
                new URL(`/dashboard/${user?.role.toLowerCase()}`, req.url)
            );
        }

        if (pathname.startsWith("/dashboard")) {
            if (user?.role === "OWNER") {
                const status = await getOnboardStatus()

                if (!status?.hasSubscription) {
                    return NextResponse.redirect(new URL("/subscriptions", req.url))
                }
            }


        }

        if (isValidAccessToken?.success && refreshToken && (await isTokenExpiredSoon(refreshToken))) {

            try {
                const nextHeaders = new Headers(req.headers);
                const response = NextResponse.next({
                    request: {
                        headers: nextHeaders
                    }
                })
                const refreshed = await refreshTokenMiddleware(refreshToken);
                if (refreshed) {
                    nextHeaders.set("X-Token-Refreshed", "1");
                }
                return NextResponse.next(
                    {
                        request: {
                            headers: nextHeaders
                        },
                        headers: response.headers
                    }
                )

            } catch (error) {
                console.error("Error in token refresh flow:", error);

            }

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