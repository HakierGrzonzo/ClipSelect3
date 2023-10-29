import { Card, CardContent, Typography } from "@mui/material"
import { SeriesResponse } from "../api/models/SeriesResponse"
import { getApiImageUrl } from "@/utils"
import Link from "next/link"

interface Props {
  series: SeriesResponse;
}

export const SeriesCard: React.FC<Props> = ({ series }) => {
    return (
        <Link href={series.name}>
            <Card sx={{ maxWidth: 250, height: "100%" }}>
                <img
                    style={{ width: "100%" }}
                    src={getApiImageUrl(`/api/series/${series.name}/cover`)}
                    alt={`Cover photo for ${series.name}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {series.name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}
