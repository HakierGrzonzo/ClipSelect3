import { Card, CardContent, Typography } from "@mui/material";
import { getApiImageUrl } from "@/utils";
import Link from "next/link";
import { SeasonResponse, SparseEpisode } from "@/api";

interface Props {
  episode: SparseEpisode;
  season: SeasonResponse;
  seriesName: string;
}

export const EpisodeCard: React.FC<Props> = ({
  episode,
  season,
  seriesName,
}) => {
  const linkTarget = `${seriesName}/${season.ordinal}/${episode.ordinal}`;
  return (
    <Link href={linkTarget}>
      <Card sx={{ width: 250, height: "100%" }}>
        <img
          style={{ width: "100%" }}
          src={getApiImageUrl(
            `/api/clips/${seriesName}/${season.ordinal}/${episode.ordinal}/thumb`,
          )}
          alt={`Cover photo for ${episode.name}`}
        />
        <CardContent>
          <Typography
            sx={{ textDecoration: "none !important" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            S{season.ordinal}E{episode.ordinal} - {episode.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
