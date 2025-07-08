import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

export function useConfirm(
	title: string,
	description: string
): [() => JSX.Element, () => Promise<unknown>] {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void;
	} | null>(null);

	function confirm() {
		return new Promise(resolve => {
			setPromise({ resolve });
		});
	}

	function handleClose() {
		setPromise(null);
	}

	function handleConfirm() {
		promise?.resolve(true);
		handleClose();
	}

	function handleCancel() {
		promise?.resolve(false);
		handleClose();
	}

	function ConfirmationDialog() {
		return (
			<ResponsiveDialog
				open={promise !== null}
				onOpenChange={handleClose}
				title={title}
				description={description}
			>
				<div className="flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
					<Button
						variant="outline"
						onClick={handleCancel}
						className="w-full lg:w-auto"
					>
						Cancel
					</Button>
					<Button
						onClick={handleConfirm}
						className="w-full lg:w-auto"
					>
						Confirm
					</Button>
				</div>
			</ResponsiveDialog>
		);
	}

	return [ConfirmationDialog, confirm];
}
