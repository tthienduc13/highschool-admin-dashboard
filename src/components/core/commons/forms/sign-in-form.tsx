"use client";
import { useLoginMutation } from "@/api/auth/query";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().min(1, { message: "Username or email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SignInForm() {
    const { mutateAsync: login, isPending: loginPending } = useLoginMutation();
    const defaultValues = {
        email: "",
        password: "",
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: UserFormValue) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof Error) {
            } else {
            }
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Username or email"
                                        disabled={loginPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        disabled={loginPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loginPending}
                        className="ml-auto mt-2 w-full"
                        type="submit"
                    >
                        {loginPending ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}
