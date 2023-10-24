import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import { Box } from "@mui/material"

export const metadata = {
    title: "ClipSelect v3",
    description: "Next.js App Router + Material UI v5",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
                        <Toolbar sx={{ backgroundColor: "background.paper" }}>
                            <Typography variant="h6" noWrap component="div">
                ClipSelect v3
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{marginTop: 10, marginInline: 5}}>
                        {children}
                    </Box>
                </ThemeRegistry>
            </body>
        </html>
    )
}
