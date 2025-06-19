import {
	CommandDialog,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DashboardCommand({ open, setOpen }: Props) {
	return (
		<CommandDialog onOpenChange={setOpen} open={open}>
			<CommandInput placeholder="Find a meeting or agent" />
			<CommandList>
				<CommandItem>Test</CommandItem>
			</CommandList>
		</CommandDialog>
	);
}
