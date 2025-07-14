import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

type Props = {
	meetingId: string;
	onCancelMeeting: () => void;
	isCancelling: boolean;
};

export function UpcomingState({
	meetingId,
	onCancelMeeting,
	isCancelling,
}: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
			<EmptyState
				image="/upcoming.svg"
				title="Not started yet"
				description="Once you start this meeting, a summary will appear here"
			/>
			<div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
				<Button
					variant="secondary"
					className="w-full lg:w-auto"
					onClick={onCancelMeeting}
					disabled={isCancelling}
				>
					<BanIcon /> Cancel Meeting
				</Button>
				<Button
					asChild
					className="w-full lg:w-auto"
					disabled={isCancelling}
				>
					<Link href={`/call/${meetingId}`}>
						<VideoIcon />
						Start Meeting
					</Link>
				</Button>
			</div>
		</div>
	);
}
