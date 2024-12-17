import Image from "next/image";
import styles from "./QRCode.module.scss";
import QRCode from "react-qr-code";

type BarcodeWithLogoProps = {
	data: string;
};

const QRCodeGenerator: React.FC<BarcodeWithLogoProps> = ({ data }) => {
	return (
		<div className={styles.barcodeContainer}>
			<QRCode
				value={data}
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
			/>
			
		</div>
	);
};

export default QRCodeGenerator;
