"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import styles from './page.module.css';
import Button from '@mui/material/Button';
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ElevateAppBar() {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition);

    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <ElevationScroll> */}
      <Box component="section" sx={{ p: 2 }}>

      </Box>
      <AppBar position="sticky" elevation={scrollPosition > 50 ? 4 : 0} color=''>
        <Toolbar>
          <Box component="section"  sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>
            <Grid container>

              <Grid item sm={4} xs={6}>
                <div className={styles.logoDiv}>
                  <img src="/iconblack.png" alt="logo" width="30" height="30" />
                  <Box sx={{ p: 1 }}></Box>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600,fontSize:'16px' }}>EzSummarizer.ai</Typography>

                </div>

              </Grid>


            <Grid item sm={8} xs={6} style={{ textAlign: 'end' }}>
              <Button style={{ textTransform: 'none' }}>Log In</Button>

              </Grid>

            </Grid>
          <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>
        </Toolbar>
      </AppBar>
      {/* </ElevationScroll> */}
      <Toolbar />
      <Container>
        <Box sx={{ p: 1 }}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum as mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum as mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum as mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum as mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum as mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
      </Container>
    </React.Fragment>
  );
}
