import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    contrastText: '#f0f0f0',
                    light: '#003F7F',
                    main: '#001f3f',
                    dark: '#002142',
                },
                secondary: {
                    light: '#FAFAFA',
                    main: '#F0F0F0',
                    dark: '#E2E2E2',
                },
                success: {
                    light: '#268C3E',
                    main: '#06711F',
                    dark: '#055A19',
                },
                error: {
                    light: '#E13B39',
                    main: '#DA0A08',
                    dark: '#AE0806',
                },
                warning: {
                    light: '#E9B449',
                    main: '#E4A11C',
                    dark: '#B68116',
                },
                background: {
                    default: "#f0f0f0"
                },
            },
        },
    },
    typography: {
        fontFamily: 'Roboto',
        fontWeightBold: 700,
        fontWeightLight: 300,
        fontWeightRegular: 400,
    },
});
