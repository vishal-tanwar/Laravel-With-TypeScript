import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import themeOptions from '../../utils/Theme';
import { AppBar, Drawer, Grid, ListItemButton, ListItemText } from '@mui/material';
import { Dashboard, MenuRounded } from '@mui/icons-material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


function Layout( props: { children: any } ) {

  const theme = createTheme( themeOptions );

  const [open, setOpen ] = React.useState<boolean>( true );

  return (
    <ThemeProvider theme={theme}>
      <AppBar style={{
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        zIndex:theme.zIndex.drawer + 1
      }} sx={{p:2}}>
        <Toolbar>
          <IconButton sx={{mr:3}}>
            <MenuRounded />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="h6" sx={{flexGrow: 1}}>
                AppBar
              </Typography>
            </Grid>
            <Grid item xs={9}>

            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent" anchor="left"
      style={{ 
        height: `calc(100% - ${theme.mixins.toolbar})`,
        top: 100,
        backgroundColor: theme.palette.background.default
        } }>
        <Box sx={{width:300}}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {props?.children}
          </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;