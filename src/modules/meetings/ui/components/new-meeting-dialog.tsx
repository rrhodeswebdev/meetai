import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingForm } from "./meeting-form";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function NewMeetingDialog({ open, onOpenChange }: Props) {
	const router = useRouter();

	return (
		<ResponsiveDialog
			title="New Meeting"
			description="Create a new meeting"
			open={open}
			onOpenChange={onOpenChange}
		>
			<MeetingForm
				onSuccess={(id) => {
					onOpenChange(false);
					router.push(`/meetings/${id}`);
				}}
				onCancel={() => onOpenChange(false)}
			/>
		</ResponsiveDialog>
	);
}
