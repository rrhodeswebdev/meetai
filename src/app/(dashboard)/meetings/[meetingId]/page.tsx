import { auth } from "@/lib/auth";
import {
	MeetingIdView,
	MeetingIdViewError,
	MeetingIdViewLoading,
} from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
	params: Promise<{ meetingId: string }>;
};

export default async function MeetingIdPage({ params }: Props) {
	const { meetingId } = await params;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<MeetingIdViewLoading />}>
				<ErrorBoundary fallback={<MeetingIdViewError />}>
					<MeetingIdView meetingId={meetingId} />
				</ErrorBoundary>
			</Suspense>
		</HydrationBoundary>
	);
	return <div>Meeting</div>;
}
