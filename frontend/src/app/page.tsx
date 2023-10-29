import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ClipsApi, OpenAPI } from "@/api";
import { SeriesCard } from "@/components/SeriesCard";

const client = new ClipsApi(OpenAPI);

export default async function HomePage() {
  const data = await client.browse.listSeriesApiSeriesGet();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h4">Welcome to ClipSelect v3</Typography>
      <Typography>Now with working search</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {data.map((series) => (
          <SeriesCard series={series} key={series.name} />
        ))}
      </Box>
    </Box>
  );
}
