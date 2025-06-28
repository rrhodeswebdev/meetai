import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";

type Props = {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialValues?: AgentGetOne;
};

export function AgentForm({ onSuccess, onCancel, initialValues }: Props) {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const createAgent = useMutation(
		trpc.agents.create.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					trpc.agents.getMany.queryOptions()
				);

				if (initialValues?.id) {
					await queryClient.invalidateQueries(
						trpc.agents.getOne.queryOptions({
							id: initialValues.id,
						})
					);
				}

				onSuccess?.();
			},
			onError: error => {
				toast.error(error.message);
			},
		})
	);

	const form = useForm<z.infer<typeof agentsInsertSchema>>({
		resolver: zodResolver(agentsInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			instructions: initialValues?.instructions ?? "",
		},
	});

	const isEdit = !!initialValues?.id;
	const isPending = createAgent.isPending;

	const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
		if (isEdit) {
			console.log("update");
		} else {
			createAgent.mutate(values);
		}
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<GeneratedAvatar
					seed={form.watch("name")}
					variant="botttsNeutral"
					className="size-16 border"
				/>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g. Math tutor"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="instructions"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instructions</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="e.g. You are a math tutor. You are good at explaining math concepts in a way that is easy to understand."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between gap-x-2">
					{onCancel && (
						<Button
							variant="ghost"
							disabled={isPending}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					)}
					<Button disabled={isPending} type="submit">
						{isEdit ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
