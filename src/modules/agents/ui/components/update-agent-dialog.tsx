import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentGetOne } from "../../types";
import { AgentForm } from "./agent-form";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: AgentGetOne;
};

export function UpdateAgentDialog({
	open,
	onOpenChange,
	initialValues,
}: Props) {
	return (
		<ResponsiveDialog
			title="Edit Agent"
			description="Edit the agent details"
			open={open}
			onOpenChange={onOpenChange}
		>
			<AgentForm
				onSuccess={() => onOpenChange(false)}
				onCancel={() => onOpenChange(false)}
				initialValues={initialValues}
			/>
		</ResponsiveDialog>
	);
}
