import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background text-gray-100 flex flex-col items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-6xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
					404
				</h1>
				<p className="text-2xl md:text-4xl mb-8">Oops! Page not found</p>
				<p className="text-lg md:text-xl mb-8 max-w-md mx-auto">
					The page you're looking for doesn't exist or has been moved to another
					dimension.
				</p>
				<div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
					<Link
						to="/"
						className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full text-white"
					>
						<span>Go Home</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
