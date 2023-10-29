"use client"
import { SearchResult } from "@/api"
import { FRONTEND_URL } from "@/constants"
import { Box, CircularProgress, TextField, Typography } from "@mui/material"
import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from "react"
import { useDebounce } from "use-debounce"
import { SearchResult as Item } from "./SearchResult"

interface Props extends PropsWithChildren {
  seriesName: string;
}

export const Search: React.FC<Props> = ({ children, seriesName }) => {
    const [query, setQuery] = useState("")
    const [value] = useDebounce(query, 1000)

    const [results, setResults] = useState<SearchResult[] | undefined | null>(
        undefined,
    )

    const fetchSearch = useCallback(
        async (query: string) => {
            setResults((value) => (value === undefined ? null : value))
            const results = await fetch(
                `${FRONTEND_URL}/api/search/${seriesName}?query=${query}`,
            )
            const data = await results.json()
            setResults(data)
        },
        [setResults, seriesName],
    )

    useEffect(() => {
        if (value.length > 3) {
            fetchSearch(value)
        } else {
            setResults(undefined)
        }
    }, [fetchSearch, value, setResults])

    const searchBox = (
        <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            id="search"
            onInput={(e) => {
                setQuery((e.target as unknown as { value: string }).value)
            }}
            value={query}
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
    )

    if (query.length === 0) {
        return (
            <Box>
                {searchBox}
                {children}
            </Box>
        )
    }

    const resultsComponent = () => {
        if (results === null) {
            return (
                <Box
                    sx={{
                        position: "absolute",
                        width: "100vw",
                        height: "100vh",
                        top: 0,
                        left: 0,
                        display: "flex",
                        alignitems: "center",
                        justifycontent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )
        }
        if (results === undefined) {
            return (
                <Typography sx={{ textAlign: "center", marginTop: 3 }}>
          Please enter more text
                </Typography>
            )
        }
        return (
            <Box
                sx={{ display: "flex", gap: 2, flexDirection: "column", marginTop: 2 }}
            >
                {results.map((result, index) => (
                    <Item {...result} key={index} />
                ))}
            </Box>
        )
    }

    return (
        <Box>
            {searchBox}
            {resultsComponent()}
        </Box>
    )
}
