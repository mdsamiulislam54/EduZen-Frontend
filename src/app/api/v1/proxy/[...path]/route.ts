import { NextRequest, NextResponse } from "next/server";
type Context = {
    params: {
        path: string[];
    };
};
const BACKEND = process.env.BACKEND_URL;

if (!BACKEND) {
    throw new Error("BACKEND_URL is required");
}

function log(title: string, data?: unknown) {
    console.log(`\n==================== ${title} ====================`);
    if (data !== undefined) console.log(data);
    console.log("===================================================\n");
}

export async function GET(req: NextRequest, context: Context) {
    const { path } = await context.params;
    return proxy(req, path);
}

export async function POST(req: NextRequest, context: Context) {
    const { path } = await context.params;
    return proxy(req, path);
}

export async function PUT(req: NextRequest, context: Context) {
    const { path } = await context.params;
    return proxy(req, path);
}

export async function DELETE(req: NextRequest, context: Context) {
    const { path } = await context.params;
    return proxy(req, path);
}

export async function PATCH(req: NextRequest, context: Context) {
    const { path } = await context.params;
    return proxy(req, path);
}

async function proxy(req: NextRequest, path: string[]) {

    log("PROXY HIT PATH", req.nextUrl.pathname);
    log("ORIGINAL PATH ARRAY", path);
    log("METHOD", req.method);

    // 🟢 remove leading "api"
    if (path[0] === "api") {
        path = path.slice(1);
    }

    log("AFTER CLEAN PATH", path);

    // 🟢 SIMPLE RULE: NEVER over-engineer
    const backendPath = path.join("/");

    log("FINAL BACKEND PATH", backendPath);

    const url = `${BACKEND}/${backendPath}${req.nextUrl.search}`;

    log("FINAL PROXY URL", url);

    const body =
        req.method !== "GET" && req.method !== "HEAD"
            ? await req.text()
            : undefined;

    const headers = new Headers();

    headers.set("origin", "http://localhost:3000");

    req.headers.forEach((value, key) => {
        headers.set(key, value);
    });

    const response = await fetch(url, {
        method: req.method,
        headers,
        body,
        credentials: "include",
    });

    log("BACKEND STATUS", response.status);

    const resBody = await response.text();

    log("BACKEND RESPONSE", resBody);

    const res = new NextResponse(resBody, {
        status: response.status,
    });

    const cookies = response.headers.getSetCookie();

    log("SET-COOKIE", cookies);

    if (cookies) {
        cookies.forEach(cookie =>
            res.headers.append("set-cookie", cookie)
        );
    }

    log("PROXY DONE");

    return res;
}