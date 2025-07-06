"use client";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataPagination } from "@/modules/agents/ui/components/data-pagination";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export function AgentsView() {
	const [filters, setFilters] = useAgentsFilters();
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.agents.getMany.queryOptions({ ...filters })
	);

	return (
		<div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
			<DataTable data={data.items} columns={columns} />
			<DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={page => setFilters({ ...filters, page })}
			/>
			{data.items.length === 0 && (
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
