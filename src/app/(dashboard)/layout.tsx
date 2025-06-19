import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className="bg-muted flex h-screen w-screen flex-col">
				{children}
			</main>
		</SidebarProvider>
	);
}
