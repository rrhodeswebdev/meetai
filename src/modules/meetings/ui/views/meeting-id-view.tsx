"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { MeetingIdViewHeader } from "@/modules/meetings/ui/components/meeting-id-view-header";
import { useTRPC } from "@/trpc/client";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

type Props = {
	meetingId: string;
};

export function MeetingIdView({ meetingId }: Props) {
	const router = useRouter();
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const { data } = useSuspenseQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);

	const [RemoveConfirmation, confirmRemove] = useConfirm(
		"Are you sure?",
		"The following action will remove this meeting"
	);

	const removeMeeting = useMutation(
		trpc.meetings.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);
				router.push("/meetings");
			},
			onError: error => {
				toast.error(error.message);
			},
		})
	);

	async function handleRemoveMeeting() {
		const ok = await confirmRemove();

		if (!ok) return;

		await removeMeeting.mutateAsync({ id: meetingId });
	}

	const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] =
		useState(false);

	return (
		<>
			<RemoveConfirmation />
			<UpdateMeetingDialog
				open={updateMeetingDialogOpen}
				onOpenChange={setUpdateMeetingDialogOpen}
				initialValues={data}
			/>
			<div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
				<MeetingIdViewHeader
					meetingId={meetingId}
					meetingName={data.name}
					onEdit={() => setUpdateMeetingDialogOpen(true)}
					onRemove={handleRemoveMeeting}
				/>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</>
	);
}

export function MeetingIdViewLoading() {
	return (
		<LoadingState
			title="Loading meeting"
			description="Please wait while we load the meeting."
		/>
	);
}

export function MeetingIdViewError() {
	return (
		<ErrorState
			title="Error loading meeting"
			description="Please try again later."
		/>
	);
}
