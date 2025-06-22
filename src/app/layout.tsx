import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

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
		<TRPCReactProvider>
			<html lang="en">
				<body className={`${inter.className} antialiased`}>
					{children}
				</body>
			</html>
		</TRPCReactProvider>
	);
}
