import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

export function AgentsSearchFilter() {
	const [filters, setFilters] = useAgentsFilters();

	return (
		<div className="relative">
			<Input
				placeholder="Filter by name"
				className="h-9 w-[200px] bg-white pl-7"
				value={filters.search}
				onChange={e =>
					setFilters({ ...filters, search: e.target.value })
				}
			/>
			<SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
		</div>
	);
}
