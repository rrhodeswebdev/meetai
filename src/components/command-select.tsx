import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandResponsiveDialog,
} from "./ui/command";

type Props = {
	options: Array<{
		id: string;
		value: string;
		children: React.ReactNode;
	}>;
	onSelect: (value: string) => void;
	onSearch?: (value: string) => void;
	value: string;
	placeholder?: string;
	isSearchable?: boolean;
	className?: string;
};

export function CommandSelect({
	options,
	onSelect,
	onSearch,
	value,
	placeholder = "Select an option",
	className,
}: Props) {
	const [open, setOpen] = useState(false);
	const selectedOption = options.find(option => option.value === value);

	return (
		<>
			<Button
				type="button"
				variant="outline"
				className={cn(
					"h-9 justify-between px-2 font-normal",
					!selectedOption && "text-muted-foreground",
					className
				)}
				onClick={() => setOpen(true)}
			>
				<div>{selectedOption?.children ?? placeholder}</div>
				<ChevronsUpDownIcon className="size-4" />
			</Button>
			<CommandResponsiveDialog
				open={open}
				onOpenChange={setOpen}
				shouldFilter={!onSearch}
			>
				<CommandInput
					placeholder="Search..."
					onValueChange={onSearch}
				/>
				<CommandList>
					<CommandEmpty>
						<span className="text-muted-foreground text-sm">
							No options found.
						</span>
					</CommandEmpty>
					{options.map(option => (
						<CommandItem
							key={option.id}
							value={option.value}
							onSelect={() => {
								onSelect(option.value);
								setOpen(false);
							}}
						>
							{option.children}
						</CommandItem>
					))}
				</CommandList>
			</CommandResponsiveDialog>
		</>
	);
}
