"use client";

import { GraduationCap,} from "lucide-react";
import {

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

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../DarkThemeButton/DarkMode";
import { useAuth } from "@/provider/AuthProdiver";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/service/auth.service";
import { toast } from "sonner";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
export interface MenuItem {
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
  });


  return (
    <nav className={cn("lg:py-4 sticky top-0 z-50 w-full transition-transform duration-300   backdrop-blur  bg-background/90 border-b border-border/50",
      visible ? "translate-y-0" : "",
      className
    )}>
      <div className="container-c">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="size-6" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  EduZen
                </h2>

                <p className="text-xs text-muted-foreground">
                  Coaching Management Platform
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-4">
            <ModeToggle />
            {
              currentUser ?
                <Button
                  variant="destructive"
                  className="w-full rounded-xl gap-2"
                  onClick={() => logoutMutation()}
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
                : <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    render={<Link href={auth.login.url} />}
                    nativeButton={false}
                    className="gap-2 rounded-xl"
                  >
                    <LogIn className="size-4" />
                    {auth.login.title}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    render={<Link href={auth.register.url} />}
                    nativeButton={false}
                    className="gap-2 rounded-xl"
                  >
                    <UserPlus className="size-4" />
                    {auth.register.title}
                  </Button>
                </div>
            }


          </div>
        </nav>


        {/* Mobile Menu */}
        <MobileNavbar
          logo={{
            title: "EduZen",
            subtitle: "Coaching Management",
            href: "/",
          }}
          menu={menu}
          auth={auth}
          currentUser={currentUser}
          onLogout={logoutMutation}
          renderMenuItem={renderMobileMenuItem}
        />
      </div>
    </nav>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink key={subItem.title} className="w-80 " render={<SubMenuLink item={subItem} />}></NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-md  font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
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
    <Link
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
    </Link>
  );
};

export { Navbar };
