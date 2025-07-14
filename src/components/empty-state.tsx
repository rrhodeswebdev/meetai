import Image from "next/image";

type Props = {
	title: string;
	description: string;
	image?: string;
};

export function EmptyState({
	title,
	description,
	image = "/empty.svg",
}: Props) {
	return (
		<div className="flex flex-col items-center justify-center">
			<Image
				src={image}
				alt="Empty State Logo"
				width={240}
				height={240}
			/>
			<div className="mx-auto flex max-w-md flex-col gap-y-6 text-center">
				<h6 className="text-lg font-medium">{title}</h6>
				<p className="text-muted-foreground text-sm">{description}</p>
			</div>
		</div>
	);
}
