import { GuestUnionType } from "@/lib/helpers/types";
import styles from "./DisplayInviteCard.module.scss";
import QRCode from "react-qr-code";
import { capitalize } from "@/utils";

export function DisplayInviteCard({
	guest,
	canvasRef,
}: {
	guest: GuestUnionType;
	canvasRef: any;
}) {
	return (
		<div className={styles.container} ref={canvasRef}>
			{guest?.name && (
				<div className={styles.name}>
					<h3>{capitalize(guest.name)}</h3>
				</div>
			)}
			<div className={styles.logoOverlay}>
				<QRCode
					value={guest?.id || ""}
					size={256}
					bgColor="#fcf4dc"
					fgColor="#000000"
					style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				/>
			</div>
		</div>
	);
}
