import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDuration } from "@/lib/utils";
import { format } from "date-fns";
import {
	BookOpenTextIcon,
	ClockFadingIcon,
	FileTextIcon,
	FileVideoIcon,
	SparkleIcon,
	SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import { MeetingGetOne } from "../../types";

type Props = {
	data: MeetingGetOne;
};

export function CompletedState({ data }: Props) {
	return (
		<div className="flex flex-col gap-y-4">
			<Tabs defaultValue="summary">
				<div className="rounded-lg border bg-white px-3">
					<ScrollArea>
						<ScrollBar orientation="horizontal" />
						<TabsList className="bg-background h-13 justify-start rounded-none p-0">
							<TabsTrigger
								value="summary"
								className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
							>
								<BookOpenTextIcon />
								Summary
							</TabsTrigger>
							<TabsTrigger
								value="transcript"
								className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
							>
								<FileTextIcon />
								Transcript
							</TabsTrigger>
							<TabsTrigger
								value="recording"
								className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
							>
								<FileVideoIcon />
								Recording
							</TabsTrigger>
							<TabsTrigger
								value="chat"
								className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
							>
								<SparklesIcon />
								Ask AI
							</TabsTrigger>
						</TabsList>
					</ScrollArea>
				</div>
				<TabsContent value="summary">
					<div className="rounded-lg border bg-white">
						<div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
							<h2 className="text-2xl font-medium capitalize">
								{data.name}
							</h2>
							<div className="flex items-center gap-x-2">
								<Link
									href={`/agents/${data.agentId}`}
									className="flex items-center gap-x-2 capitalize underline underline-offset-4"
								>
									<GeneratedAvatar
										variant="botttsNeutral"
										seed={data.agent.name}
										className="size-5"
									/>
									{data.agent.name}
								</Link>{" "}
								<p>
									{data.startedAt
										? format(data.startedAt, "PPP")
										: ""}
								</p>
							</div>
							<div className="flex items-center gap-x-2">
								<SparkleIcon className="size-4" />
								<p>General summary</p>
							</div>
							<Badge
								variant="outline"
								className="flex items-center gap-x-2 [&>svg]:size-4"
							>
								<ClockFadingIcon className="text-blue-700" />
								{data.duration
									? formatDuration(data.duration)
									: "No Duration"}
							</Badge>
							<div>
								<Markdown
									components={{
										h1: props => (
											<h1
												{...props}
												className="mb-6 text-2xl font-medium"
											/>
										),
										h2: props => (
											<h2
												{...props}
												className="mb-6 text-xl font-medium"
											/>
										),
										h3: props => (
											<h3
												{...props}
												className="mb-6 text-lg font-medium"
											/>
										),
										h4: props => (
											<h4
												{...props}
												className="mb-6 text-base font-medium"
											/>
										),
										p: props => (
											<p
												className="mb-6 leading-relaxed"
												{...props}
											/>
										),
										ul: props => (
											<ul
												className="mb-6 list-inside list-disc"
												{...props}
											/>
										),
										ol: props => (
											<ol
												className="mb-6 list-inside list-decimal"
												{...props}
											/>
										),
										li: props => (
											<li className="mb-1" {...props} />
										),
										strong: props => (
											<strong
												className="font-semibold"
												{...props}
											/>
										),
										code: props => (
											<code
												className="rounded bg-gray-100 px-1 py-0.5"
												{...props}
											/>
										),
										blockquote: props => (
											<blockquote
												className="my-4 border-l-4 pl-4 italic"
												{...props}
											/>
										),
									}}
								>
									{data.summary}
								</Markdown>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="recording">
					<div className="rounded-lg border bg-white px-4 py-5">
						<video
							src={data.recordingUrl!}
							className="w-full rounded-lg"
							controls
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
