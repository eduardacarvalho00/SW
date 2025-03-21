/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { twMerge } from "@utils/twMerge";
import { Button } from "../ui/Button";
import { useFavorite } from "@hooks/useFavorite";
import { CharacterResponse } from "@/interface/character";
import { PlanetResponse } from "@/interface/planet";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteButtonProps {
	type: "characters" | "planets";
	item: CharacterResponse | PlanetResponse;
}

const HeartParticle = () => {
	const randomAngle = Math.random() * Math.PI * 2;
	const distance = 15 + Math.random() * 15;

	return (
		<motion.div
			className="absolute w-1.5 h-1.5 rounded-full bg-red-500"
			initial={{
				x: 0,
				y: 0,
				opacity: 1,
				scale: Math.random() * 0.5 + 0.5,
			}}
			animate={{
				x: Math.cos(randomAngle) * distance,
				y: Math.sin(randomAngle) * distance,
				opacity: 0,
				scale: 0,
			}}
			transition={{
				duration: 0.8 + Math.random() * 0.5,
				ease: [0.2, 0.8, 0.4, 1],
			}}
		/>
	);
};

export function FavoriteButton({ item, type }: FavoriteButtonProps) {
	const [favorite, setFavorite] = useState(false);
	const { isFavorite, toggleFavorite } = useFavorite();
	const [showParticles, setShowParticles] = useState(false);

	useEffect(() => {
		setFavorite(isFavorite(type, item.name));
	}, [type, item]);

	const handleToggleFavorite = () => {
		const newState = toggleFavorite(type, item);
		if (!favorite && newState) {
			setShowParticles(true);
			setTimeout(() => setShowParticles(false), 1000);
		}

		setFavorite(newState);
	};
	const particles = Array.from({ length: 12 }, (_, i) => i);

	return (
		<Button
			data-testid="favorite-button"
			variant="ghost"
			size="icon"
			onClick={handleToggleFavorite}
			className={
				favorite
					? "text-red-500 hover:text-red-600 relative overflow-visible"
					: "text-[#94a3b8] hover:text-foreground relative overflow-visible"
			}
		>
			<div className="relative">
				{favorite && (
					<motion.div
						className="absolute inset-0 rounded-full bg-red-500/20 -z-10"
						initial={{ scale: 0.8 }}
						animate={{
							scale: [0.8, 1.5, 0.8],
							opacity: [0.7, 0.3, 0.7],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "loop",
							ease: "easeInOut",
						}}
					/>
				)}

				<AnimatePresence mode="wait">
					<motion.div
						key={favorite ? "favorite" : "not-favorite"}
						initial={{ scale: 0.5, rotate: favorite ? 0 : -30 }}
						animate={{
							scale: 1,
							rotate: 0,
							transition: {
								type: "spring",
								stiffness: 500,
								damping: 15,
								duration: 0.5,
							},
						}}
						exit={{
							scale: 0,
							rotate: favorite ? 0 : 30,
							transition: { duration: 0.2 },
						}}
						whileTap={{
							scale: 0.85,
							transition: { type: "spring", stiffness: 400, damping: 10 },
						}}
						className="relative z-10"
					>
						<Heart
							data-testid="heart-icon"
							className={twMerge(
								"h-5 w-5 transition-colors",
								favorite ? "fill-current" : ""
							)}
						/>
					</motion.div>
				</AnimatePresence>

				{/* Efeito de explosão quando favorita */}
				{favorite && showParticles && (
					<div className="absolute inset-0 flex items-center justify-center z-0">
						{particles.map((index) => (
							<HeartParticle key={index} />
						))}
					</div>
				)}

				{/* Efeito de onda quando clica */}
				<AnimatePresence>
					{showParticles && (
						<motion.div
							className="absolute inset-0 rounded-full border-2 border-red-500 z-0"
							initial={{ scale: 0.1, opacity: 1 }}
							animate={{
								scale: 2.5,
								opacity: 0,
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
						/>
					)}
				</AnimatePresence>

				{/* Efeito de "pop" quando favorita */}
				<AnimatePresence>
					{showParticles && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center z-20"
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: [1, 1.8, 0],
								opacity: [1, 0.8, 0],
							}}
							transition={{ duration: 0.4, times: [0, 0.5, 1] }}
						>
							<Heart className="h-5 w-5 fill-red-500 text-red-500" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Button>
	);
}
