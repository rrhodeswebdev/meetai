"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";
import { EmptyState } from "@/components/empty-state";

export function AgentsView() {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

	return (
		<div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
			<DataTable data={data} columns={columns} />
			{data.length === 0 && (
				<EmptyState
					title="Create your first agent"
					description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
				/>
			)}
		</div>
	);
}

export function AgentsViewLoading() {
	return (
		<LoadingState
			title="Loading agents"
			description="Please wait while we load the agents."
		/>
	);
}

export function AgentsViewError() {
	return (
		<ErrorState
			title="Error loading agents"
			description="Please try again later."
		/>
	);
}
