import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme();

const NotFound = () => {
    return(
        <>
            <ThemeProvider theme={theme}>


            </ThemeProvider>
        </>
    )
}

export default NotFound;