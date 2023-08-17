import { cn } from "@kirin/utils";

export default function Hero() {
  return (
    <div className="mx-auto w-[1248px] max-w-full px-[24px]">
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-20">
        <div>
          <h1
            aria-label="Secure. Private. Yours."
            className={cn(
              "flex flex-wrap justify-center text-center text-[5rem]",
              "lg:mb-16 lg:flex-col lg:text-9xl"
            )}
          ></h1>
        </div>
      </div>
    </div>
  );
}
