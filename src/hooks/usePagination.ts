import { useState } from "react";
import { useDebounce } from "./useDebounce";

interface PaginationProps {
	page: number;
	totalItems: number;
	pageLength: number;
	handleGoToPage: (_page: number) => void;
	handleTotalItems: (totalItens: number) => void;
	handlePageLength: (_pageLength: number) => void;
	handleNextPage: () => void;
	handlePrevPage: () => void;
	setToFirstPage: () => void;
}

export const usePagination = (): PaginationProps => {
	const [page, setPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [pageLength, setPageLength] = useState(10);
	const isHaveItemInNextPage = totalItems - page * pageLength > 0;

	const onGoToPage = (_page: number) => {
		setPage(_page);
	};
	const handleGoToPage = useDebounce(onGoToPage, 500);

	const handlePageLength = () => {
		setPageLength(10);
	};

	const handleNextPage = () => {
		if (isHaveItemInNextPage) {
			setPage((page) => page + 1);
		}
	};

	const handlePrevPage = () => {
		if (page > 1) setPage((page) => page - 1);
	};

	const handleTotalItems = (totalItens: number) => {
		setTotalItems(totalItens);
	};

	const setToFirstPage = () => {
		setPage(1);
	};

	return {
		page,
		pageLength,
		totalItems,
		handleGoToPage,
		handleTotalItems,
		handleNextPage,
		handlePrevPage,
		setToFirstPage,
		handlePageLength,
	};
};
