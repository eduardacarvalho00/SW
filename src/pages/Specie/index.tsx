import { Container } from "@components/Container";
import { FavoriteButton } from "@components/FavoriteButton";
import { Button } from "@components/ui/Button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@components/ui/Card";
import { Loading } from "@components/ui/Loading";
import { useGetSpecie } from "@queries/specie";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const Specie = () => {
	const { specieId } = useParams();
	const navigate = useNavigate();
	const { data: specie, isLoading: isLoadindSpecie } = useGetSpecie(
		String(specieId)
	);

	return isLoadindSpecie ? (
		<Container>
			<Loading />
		</Container>
	) : (
		specie && (
			<Container>
				<div className="space-y-6 h-vh md:h-full">
					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							size="icon"
							data-test="back-button"
							onClick={() => navigate(-1)}
						>
							<ArrowLeft className="h-4 w-4" />
						</Button>

						<h1 className="text-3xl font-bold tracking-tight">{specie.name}</h1>
						<FavoriteButton type="species" item={specie} />
					</div>

					<Card className="w-full mt-2" data-test="specie-details-card">
						<CardHeader>
							<CardTitle>Specie Details</CardTitle>
							<CardDescription>Information about {specie.name}</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="font-semibold">Average height</h3>
									<p className="text-[#94a3b8]">{specie.average_height} inch</p>
								</div>
								<div>
									<h3 className="font-semibold">Classification</h3>
									<p className="text-[#94a3b8]">{specie.classification}</p>
								</div>
								<div>
									<h3 className="font-semibold">Designtation</h3>
									<p className="text-[#94a3b8]">{specie.designation}</p>
								</div>
								<div>
									<h3 className="font-semibold">Eye colors</h3>
									<p className="text-[#94a3b8]">{specie.eye_colors}</p>
								</div>
								<div>
									<h3 className="font-semibold">Hair colors</h3>
									<p className="text-[#94a3b8]">{specie.hair_colors}</p>
								</div>
								<div>
									<h3 className="font-semibold">Language</h3>
									<p className="text-[#94a3b8]">{specie.language}</p>
								</div>
								<div>
									<h3 className="font-semibold">Skin colorsr</h3>
									<p className="text-[#94a3b8]">{specie.skin_colors}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		)
	);
};
