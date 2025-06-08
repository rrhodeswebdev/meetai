"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const { data: session } = authClient.useSession();

	if (!session) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
			<p>Logged in as {session.user?.name}</p>
			<Button
				onClick={() =>
					authClient.signOut({
						fetchOptions: {
							onSuccess: () => router.push("/sign-in"),
						},
					})
				}
			>
				Sign Out
			</Button>
		</div>
	);
}
