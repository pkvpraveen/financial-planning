import { Calculate } from "@mui/icons-material";
import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "../src/Copyright";

export default function Layout({children}: {children: React.ReactNode}){
  return <div>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Calculate sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Finalcial Planner
          </Typography>
        </Toolbar>
      </AppBar>
    {children}
    <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  </div>;
}