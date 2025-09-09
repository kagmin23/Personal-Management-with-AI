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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700 rounded-3xl shadow-2xl p-8 text-white relative transform scale-90 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                {title && <h3 className="text-2xl font-bold mb-5">{title}</h3>}

                {/* Description */}
                {description && <p className="text-slate-300 text-sm mb-10">{description}</p>}

                {/* Content */}
                {children}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.25s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.25s ease-out forwards; }
            `}</style>
        </div>
    );
}
