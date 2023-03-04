import { ThemeOptions, PaletteMode, Shadows, rgbToHex } from '@mui/material';
import React from 'react';

const storage: Storage = localStorage;
// const mode: PaletteMode = storage.getItem('theme-mode') ? storage.getItem('theme-mode')! : 'light'


const shadows = [
    "none",
    "0px 1px 15px rgb(0 0 0 / 4%), 0px 1px 6px rgb(0 0 0 / 4%)",
    ...Array<string>( 23 ).fill('none')
] as Shadows;


const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: "#6fb327",
            contrastText: "#3a3a3a"
        },
        secondary: {
            main: "#51c878",
        },
        error: {
            main: "#c43d4b"
        },
        success: {
            main: "#3e884f"
        },
        warning: {
            main: "#b69329"
        },
        info: {
            main: "#3195a5"
        },
        common:{
            black: "#3a3a3a",
            white: "#fff",
        },
        text:{
            primary: "#3a3a3a"
        },
        background: {
            paper: "#f8f8f8",
            default: "#f8f8f8"
        },
        grey:{
            400: "#ececec"
        }
    },
    shadows: shadows,
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarColor: "#6b6b6b rgba(0, 0, 0, 0.2)",
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                width: "8px"
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 15,
                backgroundColor: "#6fb327",
                minHeight: 24,
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                backgroundColor: "#51c878",
              },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                backgroundColor: "#51c878",
              },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#51c878",
              },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }
            },
          },
        },
      },
}

export default themeOptions