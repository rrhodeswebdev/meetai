import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

type Props = {
	meetingId: string;
};

export function ActiveState({ meetingId }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
			<EmptyState
				image="/upcoming.svg"
				title="Meeting in progress"
				description="Meeting will end when all participants have left"
			/>
			<div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
				<Button asChild className="w-full lg:w-auto">
					<Link href={`/call/${meetingId}`}>
						<VideoIcon />
						Join Meeting
					</Link>
				</Button>
			</div>
		</div>
	);
}
