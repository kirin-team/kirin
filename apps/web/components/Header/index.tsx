"use client";

import Navigation from "@components/Navigation";
import ProfileDropdown from "@components/ProfileDropdown";
import { Button } from "@kirin/ui";
import { cn } from "@kirin/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const isAuthorized = true;
  const [showBorder, setShowBorder] = useState(false);

  const handleScroll = () => setShowBorder(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-[101] flex min-h-[64px] w-full max-w-full justify-center bg-transparent transition-[box-shadow,background-color] duration-200 ease-in-out",
        {
          "before:shadow-header before:absolute before:-top-[1px] before:-z-[1] before:h-full before:w-full before:backdrop-blur-[5px] before:backdrop-saturate-[180%]":
            showBorder,
        }
      )}
    >
      <header
        className={cn(
          "m-auto w-full px-6",
          "lg:flex lg:w-[1448px] lg:flex-row lg:items-center"
        )}
      >
        <div className="flex flex-1 items-center justify-center">
          <div>
            <Button
              variant="tertiary"
              asChild
              className="-m-1 flex rounded p-1 text-2xl font-semibold hover:bg-inherit"
            >
              <Link href="/">Kirin</Link>
            </Button>
          </div>
          <div
            className={cn(
              "ml-8 hidden w-auto",
              "lg:flex lg:w-full lg:flex-1 lg:items-center lg:justify-center lg:bg-transparent"
            )}
          >
            <Navigation />
          </div>
        </div>
        <div className="ml-auto flex flex-1 items-center justify-center">
          <div className="ml-auto flex">
            {isAuthorized ? (
              <ProfileDropdown />
            ) : (
              <div className="flex w-full items-center gap-3">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
