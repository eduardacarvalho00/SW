/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PaginationNumbers } from "./PaginationNumbers";
import { Button } from "@components/ui/Button";

interface PaginationProps {
	page: number;
	isLoading: boolean;
	totalItems: number;
	pageLength: number;
	handlePrevPage: () => void;
	handleNextPage: () => void;
	handleGoToPage: (page: number) => void;
}

export const Pagination = ({
	page,
	isLoading,
	totalItems,
	pageLength,
	handleGoToPage,
	handlePrevPage,
	handleNextPage,
}: PaginationProps) => {
	const totalItemsIsLessEqualThan0 = totalItems - page * pageLength <= 0;
	const isFetching = isLoading;
	const isFirstPage = page === 1;
	const totalPages = Math.ceil(totalItems / pageLength);

	useEffect(() => {
		if (page > totalPages) {
			handleGoToPage(1);
		}
	}, [page]);

	return (
		<div className="flex gap-2 items-center w-full justify-center">
			<Button
				variant="outline"
				size="icon"
				onClick={handlePrevPage}
				data-test="pagination-prev"
				disabled={isFirstPage || isFetching}
			>
				&lt;
			</Button>
			<PaginationNumbers
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handleGoToPage}
			/>
			<Button
				variant="outline"
				size="icon"
				onClick={handleNextPage}
				data-test="pagination-next"
				disabled={totalItemsIsLessEqualThan0 || isFetching}
			>
				&gt;
			</Button>
		</div>
	);
};
