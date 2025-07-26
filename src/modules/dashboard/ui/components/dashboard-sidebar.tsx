"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";

const firstSection = [
	{
		icon: VideoIcon,
		label: "Meetings",
		href: "/meetings",
	},
	{
		icon: BotIcon,
		label: "Agents",
		href: "/agents",
	},
];

const secondSection = [
	{
		icon: StarIcon,
		label: "Upgrade",
		href: "/upgrade",
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className="text-sidebar-accent-foreground">
				<Link href="/" className="flex items-center gap-2 px-2 pt-2">
					<Image src="/logo.svg" alt="Logo" height={36} width={36} />
					<p className="text-2xl font-semibold">Meet AI</p>
				</Link>
			</SidebarHeader>
			<div className="px-4 py-2">
				<Separator className="text-[#5D6B68] opacity-10" />
			</div>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{firstSection.map(item => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										className={cn(
											"from-sidebar-accent via-sidebar/50 to-sidebar-color/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68]/10 hover:bg-linear-to-r/oklch",
											pathname === item.href &&
												"border-[#5D6B68]/10 bg-linear-to-r/oklch"
										)}
										isActive={pathname === item.href}
									>
										<Link href={item.href}>
											<item.icon className="size-5" />
											<span className="text-sm font-medium tracking-tight">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<div className="px-4 py-2">
					<Separator className="text-[#5D6B68] opacity-10" />
				</div>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{secondSection.map(item => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										className={cn(
											"from-sidebar-accent via-sidebar/50 to-sidebar-color/50 h-10 border border-transparent from-5% via-30% hover:border-[#5D6B68]/10 hover:bg-linear-to-r/oklch",
											pathname === item.href &&
												"border-[#5D6B68]/10 bg-linear-to-r/oklch"
										)}
										isActive={pathname === item.href}
									>
										<Link href={item.href}>
											<item.icon className="size-5" />
											<span className="text-sm font-medium tracking-tight">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="text-white">
				<DashboardTrial />
				<DashboardUserButton />
			</SidebarFooter>
		</Sidebar>
	);
}
