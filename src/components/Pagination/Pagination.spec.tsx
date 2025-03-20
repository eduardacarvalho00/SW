import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from ".";
import "@testing-library/jest-dom";

describe("Pagination Component", () => {
	const defaultProps = {
		page: 1,
		isLoading: false,
		totalItems: 50,
		pageLength: 10,
		handleGoToPage: vi.fn(),
		handlePrevPage: vi.fn(),
		handleNextPage: vi.fn(),
	};

	it("should render pagination buttons", () => {
		render(<Pagination {...defaultProps} />);

		expect(screen.getByText("<")).toBeInTheDocument();
		expect(screen.getByText(">")).toBeInTheDocument();
	});

	it("should disable prev button on first page", () => {
		render(<Pagination {...defaultProps} page={1} />);
		expect(screen.getByText("<")).toBeDisabled();
	});

	it("should disable next button when on last page", () => {
		render(
			<Pagination {...defaultProps} page={5} totalItems={50} pageLength={10} />
		);
		expect(screen.getByText(">")).toBeDisabled();
	});

	it("should call handlePrevPage when clicking previous button", () => {
		render(<Pagination {...defaultProps} page={2} />);
		const prevButton = screen.getByText("<");
		fireEvent.click(prevButton);
		expect(defaultProps.handlePrevPage).toHaveBeenCalled();
	});

	it("should call handleNextPage when clicking next button", () => {
		render(<Pagination {...defaultProps} page={2} totalItems={50} />);
		const nextButton = screen.getByText(">");
		fireEvent.click(nextButton);
		expect(defaultProps.handleNextPage).toHaveBeenCalled();
	});

	it("should render correct page numbers", () => {
		render(
			<Pagination {...defaultProps} page={1} totalItems={100} pageLength={10} />
		);
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("...")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});

	it("should call handleGoToPage when clicking a page number", () => {
		render(
			<Pagination {...defaultProps} page={1} totalItems={100} pageLength={10} />
		);
		const page2 = screen.getByText("2");
		fireEvent.click(page2);
		expect(defaultProps.handleGoToPage).toHaveBeenCalledWith(2);
	});
});
