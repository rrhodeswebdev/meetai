import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function NewAgentDialog({ open, onOpenChange }: Props) {
	return (
		<ResponsiveDialog
			title="New Agent"
			description="Create a new agent"
			open={open}
			onOpenChange={onOpenChange}
		>
			<AgentForm
				onSuccess={() => onOpenChange(false)}
				onCancel={() => onOpenChange(false)}
			/>
		</ResponsiveDialog>
	);
}
