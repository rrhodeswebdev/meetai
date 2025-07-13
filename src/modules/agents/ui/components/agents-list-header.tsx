"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { AgentsSearchFilter } from "./agents-search-filter";
import { NewAgentDialog } from "./new-agent-dialog";

export function AgentsListHeader() {
	const [filters, setFilters] = useAgentsFilters();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const isAnyFilterModified = !!filters.search;

	function onClearFilters() {
		setFilters({ search: "", page: DEFAULT_PAGE });
	}

	return (
		<>
			<NewAgentDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>
			<div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
				<div className="flex items-center justify-between">
					<h5 className="text-xl font-medium">My Agents</h5>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusIcon />
						New Agent
					</Button>
				</div>
				<ScrollArea>
					<div className="flex items-center gap-x-2 p-1">
						<AgentsSearchFilter />
						{isAnyFilterModified && (
							<Button
								variant="outline"
								size="sm"
								onClick={onClearFilters}
							>
								<XCircleIcon />
								Clear
							</Button>
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	);
}
