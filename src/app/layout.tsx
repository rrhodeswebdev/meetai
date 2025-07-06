import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Meet AI",
	description:
		"Agents to help you with your tasks, from scheduling appointments to managing your finances.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NuqsAdapter>
			<TRPCReactProvider>
				<html lang="en">
					<body className={`${inter.className} antialiased`}>
						<Toaster />
						{children}
					</body>
				</html>
			</TRPCReactProvider>
		</NuqsAdapter>
	);
}
