"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";

export function MeetingsListHeader() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
				<div className="flex items-center gap-x-2 p-1"></div>
			</div>
		</>
	);
}
