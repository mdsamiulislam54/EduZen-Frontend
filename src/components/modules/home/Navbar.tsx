"use client";

import { GraduationCap, Menu, } from "lucide-react";
import {

  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../DarkThemeButton/DarkMode";
import { useAuth } from "@/provider/AuthProdiver";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/service/auth.service";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    register: {
      title: string;
      url: string;
    }
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "#",
    alt: "logo",
    title: "EduZen",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Subscription", url: "/subscriptions" },
    { title: "Dashboard", url: "/dashboard" },

  ],
  auth = {
    login: { title: "Login", url: "/auth/login" },
    register: { title: "Register", url: "/auth/register" }

  },
  className,
}: Navbar1Props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { currentUser } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos < prevScrollPos;

      setVisible(!isScrollingDown || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      toast.success("Logout successful")
      window.location.reload();

    },
    onError: () => {
      toast.error("Logout failed")
    }
  })


  return (
    <section className={cn("p-2 sticky top-0 z-50 w-full transition-transform duration-300   backdrop-blur bg-background ",
      visible ? "translate-y-0" : "",
      className
    )}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <GraduationCap size={30} className="gradient rounded-full p-1 text-white" />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            {
              currentUser ? <Button variant="outline" className={"cursor-pointer"} onClick={() => logoutMutation()}>Logout</Button>
                : <div>

                  <Button variant="outline" render={<Link href={auth.login.url}></Link>} nativeButton={false}>{auth.login.title}</Button>
                  <Button variant="outline" render={<Link href={auth.register.url}></Link>} nativeButton={false}>{auth.register.title}</Button>

                </div>
            }


          </div>
        </nav>


        {/* Mobile Menu */}
        <div className="block lg:hidden border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">

            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md">
                <GraduationCap size={18} className="text-white" />
              </div>

              <span className="text-base font-semibold tracking-tight text-foreground">
                {logo.title}
              </span>
            </Link>

            {/* Menu Button */}
            <Sheet>
              <SheetTrigger >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl border border-border/50 bg-background/60 backdrop-blur"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent className="w-[320px] p-0 bg-background/95 backdrop-blur-xl border-l border-border/50">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient">
                      <GraduationCap size={16} className="text-white" />
                    </div>
                    <span className="font-semibold">{logo.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 p-4">

                  {/* Navigation */}
                  <div className="rounded-2xl border border-border/50 bg-muted/30 p-2">
                    <Accordion className="flex w-full flex-col gap-2">
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-border/50"

                    >
                      <Link href={auth.login.url}>
                        Login
                      </Link>
                    </Button>

                    {currentUser ? (
                      <Button
                        variant="destructive"
                        className="w-full rounded-xl hover:bg-gradient"
                        onClick={() => logoutMutation()}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button

                        className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 text-white"
                      >
                        <Link href={auth.register.url}>
                          Register
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Footer hint */}
                  <div className="text-center text-xs text-muted-foreground">
                    Smart Coaching Management System
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink key={subItem.title} className="w-80" render={<SubMenuLink item={subItem} />}></NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
