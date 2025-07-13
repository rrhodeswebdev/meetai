"use client";

import { DataPagination } from "@/components/data-pagination";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import { columns } from "@/modules/meetings/ui/components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function MeetingsView() {
	const trpc = useTRPC();
	const router = useRouter();
	const [filters, setFilters] = useMeetingsFilters();
	const { data } = useSuspenseQuery(
		trpc.meetings.getMany.queryOptions({ ...filters })
	);

	return (
		<div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
			<DataTable
				columns={columns}
				data={data.items}
				onRowClick={row => router.push(`/meetings/${row.id}`)}
			/>
			<DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={page => setFilters({ page })}
			/>
			{data.items.length === 0 && (
				<EmptyState
					title="Create your first meeting"
					description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real-time."
				/>
			)}
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
