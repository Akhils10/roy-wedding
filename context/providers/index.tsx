"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/configureStore";
import { AppProvider } from "../AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<Provider store={store!}>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<PersistGate persistor={persistor}>{children}</PersistGate>
				</AppProvider>
			</QueryClientProvider>
		</Provider>
	);
}
