import { FRONTEND_URL } from "@/constants"
import { TRange } from "@/types"
import { Box, Button, useTheme } from "@mui/material"
import React from "react"

interface Props {
  selectedCaptions: TRange;
  clearSelection: () => void;
  seriesName: string;
  seasonNumber: number;
  episodeNumber: number;
}

export const ClipListHeader: React.FC<Props> = ({
    selectedCaptions,
    clearSelection,
    seriesName,
    seasonNumber,
    episodeNumber,
}) => {
    const theme = useTheme()
    const isSomethingSelected = selectedCaptions !== undefined

    if (!isSomethingSelected) return null

    const downloadButtons =
    typeof selectedCaptions === "number" ? (
        <>
            <a
                target="_blank"
                href={`${FRONTEND_URL}/api/clips/${seriesName}/${seasonNumber}/${episodeNumber}/${selectedCaptions}/simple`}
                rel="noreferrer"
            >
                <Button variant="outlined">Download as webm</Button>
            </a>
            <a
                target="_blank"
                href={`${FRONTEND_URL}/api/clips/${seriesName}/${seasonNumber}/${episodeNumber}/${selectedCaptions}/simple?format=gif`}
                rel="noreferrer"
            >
                <Button variant="outlined">Download as GIF</Button>
            </a>
        </>
    ) : (
        <a
            target="_blank"
            href={`${FRONTEND_URL}/api/clips/${seriesName}/${seasonNumber}/${episodeNumber}/${selectedCaptions[0]}/${selectedCaptions[1]}/multi`}
            rel="noreferrer"
        >
            <Button variant="outlined">Download as webm</Button>
        </a>
    )

    return (
        <Box
            sx={{
                position: "sticky",
                top: 64,
                background: theme.palette.background.default,
            }}
        >
            <Box
                sx={{ paddingBlock: 1, display: "flex", flexDirection: "row", gap: 2 }}
            >
                <Button onClick={clearSelection} variant="outlined">
          Clear Selection
                </Button>
                {downloadButtons}
            </Box>
        </Box>
    )
}
