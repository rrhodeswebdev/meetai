import {
	DefaultVideoPlaceholder,
	StreamVideoParticipant,
	ToggleAudioPreviewButton,
	ToggleVideoPreviewButton,
	useCallStateHooks,
	VideoPreview,
} from "@stream-io/video-react-sdk";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css";

type Props = {
	onJoin: () => void;
};

function DisabledVideoPreview() {
	const { data } = authClient.useSession();

	return (
		<DefaultVideoPlaceholder
			participant={
				{
					name: data?.user.name ?? "",
					image:
						data?.user.image ??
						generateAvatarUri({
							seed: data?.user.name ?? "",
							variant: "initials",
						}),
				} as StreamVideoParticipant
			}
		/>
	);
}

function AllowBrowserPermissions() {
	return (
		<p className="text-sm">
			Please grant your browser a permission to access your camera and
			microphone.
		</p>
	);
}

export function CallLobby({ onJoin }: Props) {
	const { useCameraState, useMicrophoneState } = useCallStateHooks();

	const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
	const { hasBrowserPermission: hasCameraPermission } = useCameraState();

	const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

	return (
		<div className="from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial">
			<div className="flex flex-1 items-center justify-center px-8 py-4">
				<div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
					<div className="flex flex-col gap-y-2 text-center">
						<h6 className="text-lg font-medium">Ready to join?</h6>
						<p className="text-sm">
							Set up your call before joining
						</p>
					</div>
					<VideoPreview
						DisabledVideoPreview={
							hasBrowserMediaPermission
								? DisabledVideoPreview
								: AllowBrowserPermissions
						}
					/>
					<div className="flex gap-x-2">
						<ToggleAudioPreviewButton />
						<ToggleVideoPreviewButton />
					</div>
					<div className="flex w-full justify-between gap-x-2">
						<Button asChild variant="ghost">
							<Link href="/meetings">Cancel</Link>
						</Button>
						<Button onClick={onJoin}>
							<LogInIcon />
							Join Call
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
