"use client";

import { useGlobalContext } from "@/context/AppContext";
import { AppState, useAppDispatch } from "@/store/configureStore";
import { clearUser, updateUser } from "@/store/slices/userSlice";
import fetcher from "@/utils/fetcher";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface ValidateResponse {
	token: string;
	id: string;
	username: string;
	roles: string[];
}

export const useAuthCheck = () => {
	const { setIsPageLoading } = useGlobalContext();
	const dispatch = useAppDispatch();
	const pathName = usePathname();
	const user = useSelector((state: AppState) => state.user);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
            if (!user.token) {
                router.push("/admin/");
				return;
			}
            
            setIsPageLoading(true);
			try {
				const response: any = await fetcher(`/api/admin/auth/validate`, "POST", {
					token: user.token,
					roles: user.roles || [],
				});

                const data: ValidateResponse = response?.data;
				if (data) {
					dispatch(
						updateUser({
							...user,
							token: data.token,
							username: data.username,
							isAuthenticated: true,
							roles: data.roles,
						})
					);
				} else {
					dispatch(clearUser());
					router.push("/admin");
				}
			} catch (error) {
				dispatch(clearUser());
				router.push("/admin");
			} finally {
				setIsPageLoading(false);
			}
		};

		checkAuth();
	}, [pathName]);
};
