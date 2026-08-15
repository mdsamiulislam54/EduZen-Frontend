"use client";

import Link from "next/link";
import {
    GraduationCap,
    LogIn,
    LogOut,
    Menu,
    UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { MenuItem } from "./Navbar";

export interface MobileNavbarProps {
    logo: {
        title: string;
        subtitle?: string;
        href?: string;
    };

    menu: MenuItem[];

    auth: {
        login: {
            title: string;
            url: string;
        };
        register: {
            title: string;
            url: string;
        };
    };

    currentUser?: unknown | null;

    onLogout?: () => void;

    renderMenuItem: (item: MenuItem) => React.ReactNode;
}

export default function MobileNavbar({
    logo,
    menu,
    auth,
    currentUser,
    onLogout,
    renderMenuItem,
}: MobileNavbarProps) {
    return (
        <div className="block border-b border-border/50 bg-background/95 backdrop-blur-xl lg:hidden">
            {/* Mobile Header */}
            <div className="flex h-[68px] items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href={logo.href || "/"}
                    className="group flex items-center gap-2.5"
                >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <GraduationCap className="size-5" />
                    </div>

                    <div className="leading-none">
                        <h2 className="text-base font-bold tracking-tight">
                            {logo.title}
                        </h2>

                        {logo.subtitle && (
                            <p className="mt-1 text-[10px] font-medium text-muted-foreground">
                                {logo.subtitle}
                            </p>
                        )}
                    </div>
                </Link>

                {/* Menu Trigger */}
                <Sheet>
                    <SheetTrigger
                        className="
                flex size-10 items-center justify-center
                rounded-xl
                border border-border/60
                bg-background
                shadow-sm
                transition-all duration-200
                hover:border-primary/30
                hover:bg-primary/5
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary/30
                 "
                    >
                        <Menu className="size-5" />

                        <span className="sr-only">
                            Open menu
                        </span>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="
              w-[320px] max-w-[90vw]
              border-l border-border/60
              bg-background/95
              p-0
              backdrop-blur-xl
            "
                    >
                        {/* Drawer Header */}
                        <div className="flex h-[68px] items-center border-b border-border/50 px-5">
                            <Link
                                href={logo.href || "/"}
                                className="flex items-center gap-2.5"
                            >
                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <GraduationCap className="size-5" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold">
                                        {logo.title}
                                    </p>

                                    {logo.subtitle && (
                                        <p className="text-[10px] text-muted-foreground">
                                            {logo.subtitle}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex h-[calc(100%-68px)] flex-col px-4 py-5">
                            {/* Navigation */}
                            <div className="mb-3 px-2">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Navigation
                                </p>
                            </div>

                            <div className="rounded-2xl border border-border/50 bg-muted/20 p-2">
                                <Accordion className="flex w-full flex-col gap-1.5">
                                    {menu.map((item) => (
                                        <div key={item.title}>
                                            {renderMenuItem(item)}
                                        </div>
                                    ))}
                                </Accordion>
                            </div>

                            {/* Push actions to bottom */}
                            <div className="flex-1" />

                            {/* Account */}
                            <div className="mb-4">
                                <div className="mb-3 px-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Account
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    {/* Login */}
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-11 gap-2 rounded-xl border-border/60 bg-background text-sm"
                                        render={<Link href={auth.login.url} />}
                                        nativeButton={false}
                                    >
                                        <LogIn className="size-4" />
                                        {auth.login.title}
                                    </Button>

                                    {/* Register / Logout */}
                                    {currentUser ? (
                                        <Button
                                            variant="destructive"
                                            size="lg"
                                            className="h-11 gap-2 rounded-xl text-sm"
                                            onClick={onLogout}
                                        >
                                            <LogOut className="size-4" />
                                            Logout
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            className="
                        h-11 gap-2 rounded-xl
                        bg-primary
                        text-primary-foreground
                        shadow-sm
                        transition-all
                        hover:-translate-y-0.5
                        hover:shadow-md
                      "
                                            render={<Link href={auth.register.url} />}
                                            nativeButton={false}
                                        >
                                            <UserPlus className="size-4" />
                                            {auth.register.title}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Brand */}
                            <div className="border-t border-border/50 pt-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="size-1.5 rounded-full bg-primary" />

                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        {logo.subtitle || "Smart Management Platform"}
                                    </span>

                                    <span className="size-1.5 rounded-full bg-primary" />
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}