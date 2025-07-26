"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PricingCard } from "../components/pricing-card";

export function UpgradeView() {
	const trpc = useTRPC();
	const { data: products } = useSuspenseQuery(
		trpc.premium.getProducts.queryOptions()
	);

	const { data: currentSubscription } = useSuspenseQuery(
		trpc.premium.getCurrentSubscription.queryOptions()
	);

	return (
		<div className="flex flex-1 flex-col gap-y-10 px-4 py-4 md:px-8">
			<div className="mt-4 flex flex-1 flex-col items-center gap-y-10">
				<h5 className="text-2xl font-medium md:text-3xl">
					You are on the{" "}
					<span className="text-primary font-semibold">
						{currentSubscription?.name ?? "Free"}
					</span>{" "}
					plan
				</h5>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{products.map(product => {
						const isCurrentProduct =
							product.id === currentSubscription?.id;
						const isPremium = !!currentSubscription;

						let buttonText = "Upgrade";
						let onClick = () =>
							authClient.checkout({ products: [product.id] });

						if (isCurrentProduct) {
							buttonText = "Manage";
							onClick = () => authClient.customer.portal();
						} else if (isPremium) {
							buttonText = "Cancel";
							onClick = () => authClient.customer.portal();
						}

						return (
							<PricingCard
								key={product.id}
								variant={
									product.metadata.variant === "highlighted"
										? "highlighted"
										: "default"
								}
								title={product.name}
								description={product.description}
								price={
									product.prices[0].amountType === "fixed"
										? product.prices[0].priceAmount / 100
										: 0
								}
								priceSuffix={`/${product.prices[0].recurringInterval}`}
								features={product.benefits.map(
									benefit => benefit.description
								)}
								buttonText={buttonText}
								onClick={onClick}
								badge={product.metadata.badge as string | null}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export function UpgradeViewLoading() {
	return (
		<LoadingState
			title="Loading"
			description="Loading your upgrade options"
		/>
	);
}

export function UpgradeViewError() {
	return <ErrorState title="Error" description="Please try again later" />;
}
