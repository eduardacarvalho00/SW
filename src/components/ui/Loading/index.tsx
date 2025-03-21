import "./style.css";

export function Loading() {
	return (
		<div
			data-testid="loading"
			data-test="loading"
			className="loading-content relative z-10 text-center h-fit"
		>
			<div className="spinner mb-4" />
			<p className="loading-text text-xl font-bold text-yellow-400">
				Loading...
			</p>
		</div>
	);
}
