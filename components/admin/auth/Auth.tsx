"use client";

import { useState } from "react";
import { Button, SmallLoader } from "@/components/ui";
import styles from "./Auth.module.scss";
import toast from "react-hot-toast";
import fetcher from "@/utils/fetcher";
import { useAppDispatch } from "@/store/configureStore";
import { useRouter } from "next/navigation";
import { updateUser } from "@/store/slices/userSlice";

export default function Auth() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			if (!password && !username) return;
			const response = await fetcher("/api/admin/auth/signin", "POST", {
				password,
				username,
			});
			setPassword("");
			setUsername("");
			const userData = {
				id: response.data.userId,
				token: response.data.token,
				username: response.data.username,
				roles: response.data.roles,
				isAuthenticated: true,
			};
			dispatch(updateUser(userData));
			toast.success("sign in successful");
			router.push("/admin/guest-list");
		} catch (error: any) {
			toast.error(error.message || "An error occurred!", {
				duration: 5000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<span>Please enter your password to gain access.</span>
			</div>
			<form className={styles.input_group} onSubmit={onSubmit}>
				<input
					type="text"
					value={username}
					placeholder="username"
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					value={password}
					type="password"
					placeholder="Password"
					onChange={e => setPassword(e.target.value)}
				/>

				<Button type="submit" className={styles.button} disabled={isSubmitting}>
					Get access
					{isSubmitting && <SmallLoader />}
				</Button>
			</form>
		</div>
	);
}
