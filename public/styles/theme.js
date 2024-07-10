import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Gilroy, sans-serif',
        h1: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 700, // Bold
        },
        h2: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 600, // Semi-bold
        },
        body1: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 400, // Regular
        },
        body2: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 400,
        },
        button: {
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 600,
        },
        // Add more typography variants as needed
    },
});

export default theme;