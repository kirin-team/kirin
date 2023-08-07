'use client';

import { Button } from '@kirin/ui';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="shadow-accent sticky top-0 z-[1000] flex h-16 flex-col items-center justify-around bg-black/80 px-6 text-accent-300 shadow-[inset_0_-1px_0_0] backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="flex w-full items-center">
        <div className="flex w-full items-center gap-6">
          <Link href="/">Kirin</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button auto scale={0.6}>
            Log In
          </Button>
          <Button auto type="secondary" scale={0.6}>
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
