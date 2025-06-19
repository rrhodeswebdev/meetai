import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className="bg-muted flex h-screen w-screen flex-col">
				<DashboardNavbar />
				{children}
			</main>
		</SidebarProvider>
	);
}
