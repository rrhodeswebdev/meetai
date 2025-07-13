import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingGetOne } from "../../types";
import { MeetingForm } from "./meeting-form";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: MeetingGetOne;
};

export function UpdateMeetingDialog({
	open,
	onOpenChange,
	initialValues,
}: Props) {
	return (
		<ResponsiveDialog
			title="Update Meeting"
			description="Update the meeting"
			open={open}
			onOpenChange={onOpenChange}
		>
			<MeetingForm
				initialValues={initialValues}
				onSuccess={() => {
					onOpenChange(false);
				}}
				onCancel={() => onOpenChange(false)}
			/>
		</ResponsiveDialog>
	);
}
