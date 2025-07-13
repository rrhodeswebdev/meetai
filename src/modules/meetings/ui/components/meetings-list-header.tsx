"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { StatusFilter } from "./status-filter";

export function MeetingsListHeader() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [filters, setFilters] = useMeetingsFilters();

	const isAnyFilterModified =
		!!filters.status || !!filters.agentId || !!filters.search;

	function onClearFilters() {
		setFilters({
			status: null,
			agentId: "",
			search: "",
			page: 1,
		});
	}

	return (
		<>
			<NewMeetingDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>
			<div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
				<div className="flex items-center justify-between">
					<h5 className="text-xl font-medium">My Meetings</h5>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusIcon />
						New Meeting
					</Button>
				</div>
				<ScrollArea>
					<div className="flex items-center gap-x-2 p-1">
						<MeetingsSearchFilter />
						<StatusFilter />
						<AgentIdFilter />
						{isAnyFilterModified && (
							<Button variant="outline" onClick={onClearFilters}>
								<XCircleIcon className="size-4" />
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
