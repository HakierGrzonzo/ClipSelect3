"use client"

import React, { useEffect, useReducer } from "react"
import { Caption } from "../api/models/Caption"
import { Box } from "@mui/material"
import { CaptionText } from "./CaptionText"
import { ClipListHeader } from "./ClipListHeader"
import { TRange } from "../types"
import { useSearchParams } from "next/navigation"

const reducer = (
    state: TRange,
    clickedCaptionIndex: number | undefined,
): TRange => {
    if (clickedCaptionIndex === undefined) return undefined
    if (state === undefined) return clickedCaptionIndex
    if (typeof state === "number") {
        if (state !== clickedCaptionIndex) {
            const newState = [state, clickedCaptionIndex].sort(
                (a, b) => a - b,
            ) as TRange
            return newState
        } else return undefined
    }
    const [start, stop] = state
    if (clickedCaptionIndex > stop) return [start, clickedCaptionIndex]
    if (clickedCaptionIndex < start) return [clickedCaptionIndex, stop]
    if (clickedCaptionIndex === start) return [start + 1, stop]
    if (clickedCaptionIndex === stop) return [start, stop - 1]
    const mid = (start + stop) / 2
    if (clickedCaptionIndex > mid) return [start, clickedCaptionIndex]
    if (clickedCaptionIndex < mid) return [clickedCaptionIndex, stop]
    if (clickedCaptionIndex === mid) return clickedCaptionIndex
    return state
}

const checkIfInRange = (range: TRange, value: number): boolean => {
    if (range === undefined) return false
    if (typeof range === "number") {
        return value === range
    }
    const [lowerBound, upperBound] = range
    return value >= lowerBound && value <= upperBound
}

interface Props {
  captions: Caption[];
  seriesName: string;
  seasonNumber: number;
  episodeNumber: number;
}

export const CaptionList: React.FC<Props> = ({ captions, ...rest }) => {
    const searchParams = useSearchParams()
    const selectedCaption = searchParams.get("caption") || undefined
    const initialCaption = selectedCaption
        ? parseInt(selectedCaption)
        : undefined

    useEffect(() => {
        if (initialCaption === undefined) {
            return
        }
        const element = document.getElementById(`caption-${initialCaption}`)
        element?.scrollIntoView({behavior: "smooth", block: "center"})
    }, [initialCaption])

    const [selectedCaptions, setSelectedCaptions] = useReducer(
        reducer,
        initialCaption,
    )

    return (
        <Box>
            <ClipListHeader
                selectedCaptions={selectedCaptions}
                clearSelection={() => setSelectedCaptions(undefined)}
                {...rest}
            />
            {captions.map((caption, index) => (
                <CaptionText
                    {...caption}
                    id={`caption-${index}`}
                    isSelected={checkIfInRange(selectedCaptions, index)}
                    key={index}
                    onClick={() => setSelectedCaptions(index)}
                />
            ))}
        </Box>
    )
}
