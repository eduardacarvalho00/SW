/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Container } from "@components/Container";
import { FavoriteButton } from "@components/FavoriteButton";
import { Pagination } from "@components/Pagination";
import { Card, CardContent, CardFooter, CardLink } from "@components/ui/Card";
import { Input } from "@components/ui/Input";
import { Loading } from "@components/ui/Loading";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/Select";
import { useCharacter } from "./useCharacter";

export const Character = () => {
	const {
		searchQuery,
		setSearchQuery,
		genderFilter,
		setGenderFilter,
		allGenders,
		isLoadingCharacter,
		filteredCharacters,
		page,
		pageLength,
		totalItems,
		handleGoToPage,
		handleNextPage,
		handlePrevPage,
	} = useCharacter();

	return (
		<Container>
			<div className="space-y-6 h-vh md:h-full z-0">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Characters</h1>
					<p className="text-[#94a3b8]">
						Explore characters from the Star Wars universe.
					</p>
				</div>

				<div className="flex flex-col gap-4 md:flex-row">
					<div className="flex-1">
						<Input
							placeholder="Search by name..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full"
						/>
					</div>
					<div className="w-full md:w-48">
						<Select value={genderFilter} onValueChange={setGenderFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Gender</SelectItem>
								{allGenders.map((gender) => (
									<SelectItem key={gender} value={gender}>
										{gender}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{isLoadingCharacter ? (
					<div className="h-[70%] max-h-[70%] flex items-center justify-center">
						<Loading />
					</div>
				) : filteredCharacters && filteredCharacters.length > 0 ? (
					<div className="scrollbar overflow-y-auto h-[65%] max-h-[65%]">
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filteredCharacters.map((character) => {
								const url = character.url;
								const idCharacter = url.match(/\/(\d+)\/$/);

								return (
									<Card key={character.name} className="overflow-hidden">
										<CardContent className="p-4 gap-2 flex flex-col">
											<div className="flex items-center justify-between">
												<h2 className="text-xl font-bold">{character.name}</h2>
												<FavoriteButton type="characters" item={character} />
											</div>
											<div className="flex gap-1.5">
												<p className="text-sm">Gender:</p>
												<p className="text-sm font-medium">
													{character.gender}
												</p>
											</div>
											<div className="flex gap-1.5">
												<p className="text-sm">Birth Year:</p>
												<p className="text-sm font-medium">
													{character.birth_year}
												</p>
											</div>
										</CardContent>
										<CardFooter className="p-4 pt-0">
											<CardLink
												href={`/characters${idCharacter && idCharacter[0]}`}
												text="View Details"
											/>
										</CardFooter>
									</Card>
								);
							})}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
						<h2 className="text-xl font-semibold">No characters found</h2>
						<p>Try adjusting your search or filter criteria</p>
					</div>
				)}
				{!isLoadingCharacter && filteredCharacters.length > 0 && (
					<Pagination
						page={page}
						pageLength={pageLength}
						isLoading={isLoadingCharacter}
						totalItems={totalItems}
						handleGoToPage={handleGoToPage}
						handleNextPage={handleNextPage}
						handlePrevPage={handlePrevPage}
					/>
				)}
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
};
