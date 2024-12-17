"use client";

import { Header, Footer, BreadCrumb, PreLoader } from "@/components/ui";
import Providers from "@/context/providers";
import "@/styles/index.scss";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	return (
		<html lang="en">
			{/* <link rel="icon" href="/images/favicon.png" sizes="any" /> */}
			<title>Yoma and Robert&apos;s wedding website</title>
			<body>
				<Providers>
					<PreLoader />
					<Toaster
						position="bottom-center"
						toastOptions={{
							style: {
								fontSize: "1.8rem",
								fontWeight: 600,
								fontFamily: '"EB Garamond", serif',
								background: "#333",
								color: "#fff",
							},
						}}
					/>
					{!pathname.includes("/admin") ? (
						<>
							<Header />
							<BreadCrumb />
							{children}
							<Footer />
						</>
					) : (
						children
					)}
				</Providers>
			</body>
		</html>
	);
}
