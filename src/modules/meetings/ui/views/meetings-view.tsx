"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function MeetingsView() {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

export function MeetingsViewLoading() {
	return (
		<LoadingState
			title="Loading meetings"
			description="Please wait while we load the meetings."
		/>
	);
}

export function MeetingsViewError() {
	return (
		<ErrorState
			title="Error loading meetings"
			description="Please try again later."
		/>
	);
}
