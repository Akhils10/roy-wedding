"use client";

import { AppState } from "@/store/configureStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useRedirectAuth = () => {
	const { isAuthenticated } = useSelector((state: AppState) => state.user);
	const router = useRouter();
    
	useEffect(() => {
        if (!isAuthenticated) {
			router.push("/admin/");
		}
	}, [router, isAuthenticated]);
};