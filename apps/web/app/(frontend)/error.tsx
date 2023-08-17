"use client";

export default function Error({}: { error: Error; reset: () => void }) {
  return <h1>Something went wrong!</h1>;
}
