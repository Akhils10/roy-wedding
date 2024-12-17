"use client";

interface GlobalContext {
	isPageLoading: boolean;
	setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
import React, { useState, useContext, createContext } from "react";

const AppContext = createContext<GlobalContext | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
	return (
		<AppContext.Provider
			value={{
				isPageLoading,
				setIsPageLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	if (!AppContext)
		throw new Error("This hook should be called within an AppContext provider");
	return useContext(AppContext) as GlobalContext;
};

export { AppContext, AppProvider };