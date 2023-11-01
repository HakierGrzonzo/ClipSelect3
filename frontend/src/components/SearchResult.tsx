import React from "react"
import { SearchResult as Props, SparseEpisode } from "@/api"
import Link from "next/link"
import { Card, CardContent, Typography } from "@mui/material"
import { getApiImageUrl } from "@/utils"

export const SearchResult: React.FC<Omit<Props, 'episode'> & {episode: SparseEpisode}> = ({
    text,
    series_name,
    season,
    episode,
    caption,
}) => {
    const episodeLink = `/${series_name}/${season}/${episode}?caption=${caption}`
    return (
      <Link href={episodeLink}>
        <Card sx={{width: 400}}>
          <img
              style={{ width: "100%" }}
              src={getApiImageUrl(
                  `/api/clips/${series_name}/${season}/${episode.ordinal}/thumb?caption=${caption}`,
              )}
              alt={`Cover photo for ${episode.name}`}
          />
          <CardContent>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="body2" sx={{marginTop: 2}}>S{season}E{episode.ordinal} - {episode.name}</Typography>
          </CardContent>
        </Card>
      </Link>
    )
}
