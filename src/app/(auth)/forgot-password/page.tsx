"use client";

import LogoLoader from "@/components/LogoLoader";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/services/auth/authService";
import { ArrowLeft, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [redirecting, setRedirecting] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const onSubmit = async () => {
		if (!email.trim()) {
			toast.error("Please enter your email.");
			return;
		}
		setIsLoading(true);
		try {
			const res = await forgotPassword(email.trim());
			toast.success(res?.message || "✅ Password recovery email sent.");
			setOpenModal(true);
			} catch (err: unknown) {
				const error = err as { message?: string; messages?: string[] };
				if (error?.messages?.length) error.messages.forEach((m) => toast.error(m));
				else if (error?.message) toast.error(error.message);
				else toast.error("An error occurred while submitting the forgot password request.");
		} finally {
			setIsLoading(false);
		}
	};

	const closeModal = () => {
		setOpenModal(false);
		setRedirecting(true);
		setTimeout(() => router.push("/login?form=1"), 150);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
			  {(isLoading || redirecting) && (
				<div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
				  <LogoLoader fullScreen={false} label={redirecting ? 'Page turning...' : 'Submitting password change request...'} size="lg" />
				</div>
			)}

			{/* background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="w-full max-w-md bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl p-10 relative z-10">
				{/* nút back */}
				<Button
						onClick={() => {
							setRedirecting(true);
							setTimeout(() => router.push("/login?form=1"), 150);
						}}
					className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
				>
					<ArrowLeft className="w-5 h-5" />
				</Button>

				<div className="mb-10 text-center">
					<div className="mb-6 flex justify-center">
						<Image src="/logo.svg" alt="App Logo" width={64} height={64} priority className="drop-shadow-lg" />
					</div>
					<h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
					<p className="text-slate-400 text-sm italic">Enter your registered email to receive a new password.</p>
				</div>

				<div className="mb-6">
					<label htmlFor="email" className="block text-slate-300 text-sm mb-2">
						Email
					</label>
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="bg-slate-800/50 border-slate-600/50 text-white rounded-xl focus:border-blue-500 focus:bg-slate-800 transition-all"
					/>
				</div>

				<Button
					onClick={onSubmit}
					disabled={isLoading || !email.trim()}
					className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
				>
					{isLoading ? (
						<>
							<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
							Đang gửi...
						</>
					) : (
						<>
							Gửi
							<Send className="w-4 h-4" />
						</>
					)}
				</Button>
			</div>

			<Modal
				open={openModal}
				onClose={closeModal}
				title="✅ Reset Password Successfully!"
				description="A new password has been sent to your email, please log in and reset your password to ensure privacy."
			>
				<div className="flex justify-end mt-4">
					<Button onClick={closeModal} className="bg-slate-800 hover:bg-slate-700">
						Close
					</Button>
				</div>
			</Modal>
		</div>
	);
}

