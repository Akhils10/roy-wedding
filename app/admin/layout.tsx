"use client";

import { Header } from "@/components/admin/ui";
import { Footer } from "@/components/ui";
import { useGlobalContext } from "@/context/AppContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useRedirectAuth } from "@/hooks/useRedirectAuth";
import styles from "./layout.module.scss";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// useRedirectAuth();
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
