
export type Role = "ADMIN" | "OWNER" | "TEACHER" | "STUDENT" | null
export type RouteConfig = {
    exact: string[];
    pattern: RegExp[]
}

export const authRoute = ["/auth/login", "/auth/register", "/auth/email-verify", "/auth/forgot-password", "/auth/reset-password"];


export const isAuthRoute = (pathName: string) => {
    return authRoute.some(route => pathName.startsWith(route));
};

export const adminProtectedRoute: RouteConfig = {
    pattern: [/^\/admin/],
    exact: []
}
export const ownerProtectedRoute: RouteConfig = {
    pattern: [/^\/owner/],
    exact: []
}
export const teacherProtectedRoute: RouteConfig = {
    pattern: [/^\/teacher/],
    exact: []
}
export const studentProtectedRoute: RouteConfig = {
    pattern: [/^\/student/],
    exact: []
}

export const isRouteMatch = (pathname: string, route: RouteConfig) => {
    if (route.exact.includes(pathname)) return true;
    return route.pattern.some((pattern: RegExp) => pattern.test(pathname))
};



export const routeOwner = (pathName: string): Role => {
    if (isRouteMatch(pathName, adminProtectedRoute)) return "ADMIN";
    if (isRouteMatch(pathName, ownerProtectedRoute)) return "OWNER";
    if (isRouteMatch(pathName, studentProtectedRoute)) return "STUDENT";
    if (isRouteMatch(pathName, teacherProtectedRoute)) return "TEACHER";
    return null;
}


export const roleDashboardMap = {
  ADMIN: "/dashboard/admin",
  OWNER: "/dashboard/owner",
  TEACHER: "/dashboard/teacher",
  STUDENT: "/dashboard/student",
  null: "/auth/login"
};