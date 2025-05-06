"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { NavLinks } from "./data";
import { usePathname, useRouter } from "next/navigation";
import { TNavItems, TMobileNavMenu } from "./types";
import ThemeToggler from "./theme/theme-toggler";
import { MenuIcon, XIcon } from "./svg";
import { AnimatePresence, motion } from "motion/react";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  const mobileNavButtonClick = () => {
    setMobileNav(!mobileNav);
    document.body.style.overflow = mobileNav ? "auto" : "hidden";
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        document.body.style.overflow = "auto";
        setMobileNav(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="sticky z-50 top-0 ">
        <nav className="bg-primary/95  backdrop-blur-sm supports-[backdrop-filter]:bg-primary/85 width padding mt-2 py-4 rounded-md flex items-center justify-between text-secondary">
          <div className="text-2xl font-medium tracking-tight ">
            Loan Calculator
          </div>
          <NavItems
            router={router}
            pathname={pathname}
            className="hidden md:flex gap-2"
          />
          <div className="flex gap-2">
            <ThemeToggler />
            <Button
              className="md:hidden"
              variant={"accent"}
              size={"icon"}
              onClick={mobileNavButtonClick}
            >
              <MenuIcon />
            </Button>
          </div>
        </nav>
      </header>
      <MobileNavMenu
        router={router}
        pathname={pathname}
        mobileNav={mobileNav}
        mobileNavButtonClick={mobileNavButtonClick}
      />
    </>
  );
};

const NavItems = ({
  router,
  pathname,
  className,
  forMobile,
}: TNavItems) => {
  return (
    <div className={className}>
      {NavLinks.map(({ label, link, live }, index) => (
        <Button
          disabled={pathname === link}
          key={label}
          variant={"link"}
          onClick={() => {
            router.push(link);
          }}
          initial={{
            opacity: 0,
            y: forMobile ? 0 : -10,
            x: forMobile ? -50 : 0,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            x: 0,
          }}
          transition={{
            duration: 0.3 * index,
            ease:'linear'
          }}
          viewport={{
            once: !forMobile ? true : false,
          }}
        >
          {label}
          {live && (
            <sup className="ps-1">
              <span className="inline-flex items-center gap-1">
                <span className=" text-xs text-danger font-semibold">Live</span>
                <span className="size-1.5 bg-danger rounded-full relative">
                  <span className="absolute inset-0 animate-ping bg-danger rounded-full"></span>
                </span>
              </span>
            </sup>
          )}
        </Button>
      ))}
    </div>
  );
};

const MobileNavMenu = ({
  mobileNav,
  mobileNavButtonClick,
  pathname,
  router,
}: TMobileNavMenu) => {
  return (
    <AnimatePresence mode="wait">
      {mobileNav && (
        <motion.nav
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 0.5 }}
          className="fixed min-w-full h-dvh top-0 z-50 overflow-y-scroll bg-background hide-scrollbar"
        >
          <div className="width pt-6 pb-10">
            <div className=" padding flex justify-end ">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={mobileNavButtonClick}
              >
                <XIcon />
              </Button>
            </div>

            <NavItems
              forMobile
              router={router}
              pathname={pathname}
              className="flex flex-col gap-6 items-start place-self-center pt-6"
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
