import { Auth } from "@/components/admin";
import styles from './page.module.scss';

export default function AuthPage() {
	return (
		<div className={styles.container}>
			<Auth />
		</div>
	);
}
