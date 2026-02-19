// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#d7336c", // Velora pink
        },
        background: {
            default: "#ffffff",
        },
        text: {
            primary: "#171717",
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                InputLabelProps: { shrink: true },
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px", // Adjust the radius
                        backgroundColor: "transparent",
                        "& fieldset": {
                            borderColor: "#e4dcdf",
                        },
                        "&:hover fieldset": {
                            borderColor: "#d7336c",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#d7336c",
                            borderWidth: "2px",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#171717",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        "&.Mui-focused": {
                            color: "#d7336c",
                        },
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "0.875rem",
                    },
                },
            },
        },
    },
});
