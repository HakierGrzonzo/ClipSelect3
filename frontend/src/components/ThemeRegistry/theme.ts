import { Roboto } from "next/font/google"
import { createTheme } from "@mui/material/styles"
import colors from "../../colors.json"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
})

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: colors.special.background,
            paper: colors.colors.color10,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === "info" && {
                        backgroundColor: "#60a5fa",
                    }),
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 0,
                    borderColor: colors.colors.color3,
                    color: colors.colors.color3,
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: () => ({
                    backgroundColor: colors.special.background,
                }),
            },
        },
    },
})

export default theme
