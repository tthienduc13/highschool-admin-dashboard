import SignInForm from "@/components/core/commons/forms/sign-in-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@public/colored-logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function SignInModule() {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/examples/authentication"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 hidden md:right-8 md:top-8"
                )}
            >
                Login
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image src={Logo} alt="color logo" />
                </div>
                {/* <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This library has saved me countless hours of
                            work and helped me deliver stunning designs to my
                            clients faster than ever before.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div> */}
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-left">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login to <br />
                            HighSchool Management
                        </h1>
                    </div>
                    <SignInForm />
                </div>
            </div>
        </div>
    );
}
