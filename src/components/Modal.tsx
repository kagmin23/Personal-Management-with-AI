"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
	open: boolean;
	title?: string;
	description?: string;
	onClose: () => void;
	children?: ReactNode;
}

export default function Modal({ open, title, description, onClose, children }: ModalProps) {
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (open) document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

		return (
			<div
				className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			>
				<div
					className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-white"
					onClick={(e) => e.stopPropagation()}
				>
				{title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
				{description && <p className="text-slate-300 text-sm mb-4">{description}</p>}
				{children}
			</div>
		</div>
	);
}

