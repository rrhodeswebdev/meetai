"use client";

import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { authClient } from "@/lib/auth-client";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		email: z.string().email(),
		password: z.string().min(1, { message: "Password is required" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm password is required" }),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

type FormSchema = z.infer<typeof formSchema>;

export const SignUpView = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: FormSchema) => {
		setError(null);
		setPending(true);

		authClient.signUp.email(
			{
				email: data.email,
				password: data.password,
				name: data.name,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					setPending(false);
					router.push("/");
				},
				onError: ({ error }) => {
					setPending(false);
					setError(error.message);
				},
			}
		);
	};

	const onSocial = (provider: "google" | "github") => {
		setError(null);
		setPending(true);

		authClient.signIn.social(
			{
				provider,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					setPending(false);
				},
				onError: ({ error }) => {
					setPending(false);
					setError(error.message);
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form
							className="p-6 lg:p-8"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">
										Let&apos;s get started
									</h1>
									<p className="text-muted-foreground text-balance">
										Create your account
									</p>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="John Doe"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="me@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="***********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="***********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{!!error && (
									<Alert className="bg-destructive/10 border-none">
										<OctagonAlertIcon className="!text-destructive h-4 w-4" />
										<AlertTitle>{error}</AlertTitle>
									</Alert>
								)}
								<Button
									type="submit"
									className="w-full"
									disabled={pending}
								>
									Sign up
								</Button>
								<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
									<span className="bg-card text-muted-foreground relative z-10 px-2">
										Or continue with
									</span>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<Button
										variant="outline"
										type="button"
										className="w-full"
										disabled={pending}
										onClick={() => onSocial("google")}
									>
										<FaGoogle />
									</Button>
									<Button
										variant="outline"
										type="button"
										className="w-full"
										disabled={pending}
										onClick={() => onSocial("github")}
									>
										<FaGithub />
									</Button>
								</div>
								<div className="text-center text-sm">
									<p className="text-muted-foreground text-sm">
										Already have an account?{" "}
										<Link
											href="/sign-in"
											className="underline underline-offset-4"
										>
											Sign up
										</Link>
									</p>
								</div>
							</div>
						</form>
					</Form>
					<div className="from-sidebar-accent to-sidebar relative hidden flex-col items-center justify-center gap-y-4 bg-radial md:flex">
						<img
							src="/logo.svg"
							alt="Logo"
							className="h-[92px] w-[92px]"
						/>
						<p className="text-2xl font-semibold text-white">
							Meet AI
						</p>
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance underline-offset-4 *:[a]:hover:underline">
				By clicking continue, you agree to our Terms of Service and
				Privacy Policy
			</div>
		</div>
	);
};
