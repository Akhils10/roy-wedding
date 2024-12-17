"use client";

import { Header } from "@/components/admin/ui";
import { Footer } from "@/components/ui";
import { useGlobalContext } from "@/context/AppContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useAuthCheck();
	const { isPageLoading } = useGlobalContext();
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
