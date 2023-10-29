import { ClipsApi, OpenAPI } from "@/api"
import { EpisodeCard } from "@/components/EpisodeCard"
import { Box, Typography } from "@mui/material"

const client = new ClipsApi(OpenAPI)

export default async function Page({
    params,
}: {
  params: { series_name: string };
}) {
    const seriesName = decodeURI(params.series_name)
    const seasons =
    await client.browse.listSeasonsAndEpisodesApiSeriesSeriesNameGet(
        seriesName,
    )
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h4">{seriesName}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {seasons.map((season) => (
                    <Box key={season.ordinal}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            {season.name}
                        </Typography>
                        <Box
                            key={season.ordinal}
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            {season.episodes.map((episode) => (
                                <EpisodeCard
                                    key={episode.ordinal}
                                    episode={episode}
                                    season={season}
                                    seriesName={seriesName}
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
