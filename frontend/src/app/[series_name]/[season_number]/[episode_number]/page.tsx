import { ClipsApi, OpenAPI, SeasonResponse } from "@/api";
import { CaptionList } from "@/components/CaptionList";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const client = new ClipsApi(OpenAPI);

interface LinkProps {
  href: string;
  title?: string;
}

const getPreviousEpisodeLink = (
  episodeNumber: number,
  seasonNumber: number,
  seasons: SeasonResponse[],
  seriesName: string,
): undefined | LinkProps => {
  const episodeIndex = episodeNumber - 1;
  const seasonIndex = seasonNumber - 1;
  if (episodeIndex !== 0) {
    const previousEpisode = seasons[seasonIndex].episodes[episodeIndex - 1];
    return {
      href: `/${seriesName}/${seasonNumber}/${episodeNumber - 1}`,
      title: previousEpisode.name,
    };
  } else if (seasonIndex !== 0) {
    const previousSeasonEpisodes = seasons[seasonIndex - 1].episodes;
    const previousEpisode = previousSeasonEpisodes.at(-1);
    return {
      href: `/${seriesName}/${seasonNumber - 1}/${
        previousSeasonEpisodes.length
      }`,
      title: previousEpisode?.name,
    };
  }
};

const getNextEpisodeLink = (
  episodeNumber: number,
  seasonNumber: number,
  seasons: SeasonResponse[],
  seriesName: string,
): undefined | LinkProps => {
  const episodeIndex = episodeNumber - 1;
  const seasonIndex = seasonNumber - 1;
  const thisSeason = seasons[seasonIndex];
  const nextEpisodeInSeason = thisSeason.episodes.at(episodeIndex + 1);
  if (nextEpisodeInSeason) {
    return {
      href: `/${seriesName}/${seasonNumber}/${episodeNumber + 1}`,
      title: nextEpisodeInSeason.name,
    };
  }
  const nextSeason = seasons.at(seasonIndex + 1);
  if (nextSeason) {
    const nextEpisode = nextSeason.episodes[0];
    return {
      href: `/${seriesName}/${seasonNumber + 1}/1`,
      title: nextEpisode.name,
    };
  }
};
export default async function EpisodePage({
  params: { episode_number, season_number, series_name },
}: {
  params: {
    episode_number: string;
    series_name: string;
    season_number: string;
  };
}) {
  const episodeNumber = parseInt(episode_number);
  const seasonNumber = parseInt(season_number);
  const seriesName = decodeURI(series_name);
  const [captions, seasons] = await Promise.all([
    client.browse.getAllQuotesApiSeriesSeriesNameSeasonOrdinalEpisodeOrdinalGet(
      seriesName,
      seasonNumber,
      episodeNumber,
    ),
    client.browse.listSeasonsAndEpisodesApiSeriesSeriesNameGet(seriesName),
  ]);

  const thisSeason = seasons[seasonNumber - 1];
  const thisEpisode = thisSeason.episodes[episodeNumber - 1];

  const previousEpisodeLink = getPreviousEpisodeLink(
    episodeNumber,
    seasonNumber,
    seasons,
    seriesName,
  );
  const nextEpisodeLink = getNextEpisodeLink(
    episodeNumber,
    seasonNumber,
    seasons,
    seriesName,
  );

  return (
    <Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4">{thisEpisode.name}</Typography>
        <Box
          sx={{ marginTop: 2, display: "flex", flexDirection: "row", gap: 2 }}
        >
          {previousEpisodeLink && (
            <Link {...previousEpisodeLink} prefetch>
              <Button variant="outlined">Previous</Button>
            </Link>
          )}
          <Link href={`/${seriesName}`}>
            <Button variant="outlined">Full Series</Button>
          </Link>
          {nextEpisodeLink && (
            <Link {...nextEpisodeLink} prefetch>
              <Button variant="outlined">Next</Button>
            </Link>
          )}
        </Box>
      </Box>
      <CaptionList
        captions={captions}
        episodeNumber={episodeNumber}
        seasonNumber={seasonNumber}
        seriesName={seriesName}
      />
    </Box>
  );
}
