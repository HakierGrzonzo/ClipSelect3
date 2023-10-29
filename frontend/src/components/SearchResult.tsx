import React from "react"
import { SearchResult as Props } from "@/api"
import Link from "next/link"

export const SearchResult: React.FC<Props> = ({
    text,
    series_name,
    season,
    episode,
    caption,
}) => {
    const episodeLink = `/${series_name}/${season}/${episode}?caption=${caption}`
    return <Link href={episodeLink}>{text}</Link>
}
