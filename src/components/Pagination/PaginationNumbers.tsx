interface PaginationNumbersProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const PaginationNumbers = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationNumbersProps) => {
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 7;

		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		pages.push(1);

		let startPage = Math.max(2, currentPage - 2);
		let endPage = Math.min(totalPages - 1, currentPage + 2);

		if (currentPage <= 4) {
			endPage = 5;
		}

		if (currentPage >= totalPages - 3) {
			startPage = totalPages - 4;
		}

		if (startPage > 2) {
			pages.push("...");
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) {
			pages.push("...");
		}

		pages.push(totalPages);

		return pages;
	};

	return (
		<div className="flex space-x-1">
			{getPageNumbers().map((pageNum, index) => (
				<button
					key={index}
					type="button"
					className={`px-3 py-2 h-9 rounded-lg transition-colors cursor-pointer
          ${pageNum === currentPage ? "bg-gray-800 border-[#27272a] text-white font-medium" : "bg-transparent text-white border-[1px] border-[#27272a] hover:border-gray-300"}
          ${pageNum === "..." ? "opacity-50 cursor-not-allowed" : ""}`}
					onClick={() => {
						if (typeof pageNum === "number") {
							onPageChange(pageNum);
						}
					}}
					disabled={pageNum === "..."}
				>
					{pageNum}
				</button>
			))}
		</div>
	);
};
