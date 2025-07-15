"use client";

import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { LoaderIcon } from "lucide-react";
import { CallConnect } from "./call-connect";

type Props = {
	meetingId: string;
	meetingName: string;
};

export function CallProvider({ meetingId, meetingName }: Props) {
	const { data, isPending } = authClient.useSession();

	if (!data || isPending) {
		return (
			<div className="from-sidebar-accent to-sidebar flex h-screen items-center justify-center bg-radial">
				<LoaderIcon className="size-6 animate-spin text-white" />
			</div>
		);
	}

	return (
		<CallConnect
			meetingId={meetingId}
			meetingName={meetingName}
			userId={data.user.id}
			userName={data.user.name}
			userImage={
				data.user.image ??
				generateAvatarUri({ seed: data.user.id, variant: "initials" })
			}
		/>
	);
}
