import { useEffect, useRef, useState } from "react";
import styles from "./DownloadInvite.module.scss";
import { GuestUnionType } from "@/lib/helpers/types";
import fetcher from "@/utils/fetcher";
import toast from "react-hot-toast";
import { Button, SmallLoader } from "@/components/ui";
import { DisplayInviteCard } from "../displayInviteCard/DisplayInviteCard";
import NextImage from "next/image";
import { capitalize } from "@/utils";
import domtoimage from "dom-to-image";
// import html2canvas from 'html2canvas';

export default function DownloadInvite() {
	const [name, setName] = useState("");
	const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [rsvpGuest, setRsvpGuest] = useState<GuestUnionType | null>(null);
	const canvasRef = useRef<any>(null);
	const [imgData, setImgData] = useState("");
	const [imageLoaded, setImageLoaded] = useState(false);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			if (!name && !emailOrPhoneNumber) return;
			const email = emailOrPhoneNumber.includes("@")
				? emailOrPhoneNumber
				: undefined;
			const phoneNumber = !emailOrPhoneNumber.includes("@")
				? emailOrPhoneNumber
				: undefined;
			const response = await fetcher("/api/guest/rsvp", "POST", {
				name,
				email,
				phoneNumber,
			});
			if (response.data) setRsvpGuest(response.data);
			toast.success("You have confirmed your reservation", {
				duration: 5000,
			});
			setName("");
			setEmailOrPhoneNumber("");
		} catch (error: any) {
			toast.error(error.message || "Please try a different email or phone number", {
				duration: 5000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const generateImage = async () => {
		try {
			// html2canvas(canvasRef.current, {
			// 	allowTaint: true
			// }).then(canvas => {
			// 	const dataUrl = canvas.toDataURL('image/png', 1)
			// 	setImgData(dataUrl)
			// })
			domtoimage
				.toPng(canvasRef.current, { quality: 1 })
				.then(function (dataUrl) {
					setImgData(dataUrl);
				})
				.catch(function (error) {
					console.error("oops, something went wrong!", error);
				});
		} catch (error) {}
	};

	const saveAs = (uri: string, filename: string) => {
		const link = document.createElement("a");
		link.href = uri;
		if (typeof link.download === "string") {
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(uri);
		}
	};

	useEffect(() => {
		const img = new Image();
		img.src = '/resources/invitation-card.png';
	
		img.onload = () => {
		  setImageLoaded(true);
		};
	  }, []);

	useEffect(() => {
		const runFn = async () => {
			if (rsvpGuest && canvasRef.current) {
				// await new Promise(resolve => setTimeout(resolve, 100));
				await generateImage();
			}
		};

		runFn();
	}, [rsvpGuest, canvasRef.current]);

	const downloadImage = () => {
		if (imgData && rsvpGuest)
			saveAs(imgData, `A&P-wedding-${capitalize(rsvpGuest?.name)}-invite`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<span>
					Enter your full name that was registered in guest list to
					retrieve your invite.
				</span>
			</div>
			<div className={styles.input_group}>
				<input
					type="text"
					placeholder="Full name"
					onChange={e => setName(e.target.value)}
				/>
				{/* <input
					type="text"
					placeholder="Phone number"
					onChange={e => setEmailOrPhoneNumber(e.target.value)}
				/> */}
				{/* <input
					type="text"
					placeholder="OTP"
					onChange={e => setOtp(e.target.value)}
				/> */}
				<Button
					className={styles.button}
					onClick={onSubmit}
					disabled={isSubmitting}
				>
					Retrieve Invite Card
					{isSubmitting && <SmallLoader />}
				</Button>
			</div>

			{rsvpGuest && imageLoaded && !imgData && <DisplayInviteCard guest={rsvpGuest} canvasRef={canvasRef} />}
			{imgData && (
				<>
					<div className={styles.invite_preview}>
						<NextImage
							src={imgData}
							className={styles.preview_image}
							fill
							priority
							alt=""
						/>
					</div>
					<Button className={styles.downloadBtn} onClick={downloadImage}>
						Download
					</Button>
				</>
			)}
		</div>
	);
}
