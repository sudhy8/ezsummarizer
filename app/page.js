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
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import Typewriter from './TypingEffect';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from '@supabase/auth-ui-react'
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js'
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';

// Importing Supabase client creation function
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

//creating an AppBar that changes elevation (shadow) when the user scrolls
function ElevationScroll(props) {
  const { children } = props; // Destructure children from props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0, // Trigger at the top of the page (0px from the top)
  });

  // Clone the child element with a modified elevation prop based on the scroll position
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
// Define the expected prop types for the ElevationScroll component
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ElevateAppBar() {

  const router = useRouter();

  const [scrollPosition, setScrollPosition] = useState(0);

  // Destructure various utilities from react-hook-form for form handling
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [charCount, setCharCount] = useState(0);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const notify = () => toast.success("Copied!");
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [session, setSession] = useState(null)

  useEffect(() => {
    // Fetch the current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session", session)
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session", session)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleCloseAuth = () => {
    setAuthOpen(false);
  };


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  async function query(data) {
    console.log("bit", data)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/pegasus-large",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  // Function to handle logging out the user using Supabase authentication
  const logOut = async() => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      
    }
  }
  const onSubmit = data => {
    setLoading(true)
    setDescription(null)
    console.log("*********", data)
    let val = {
      inputs: data?.Content
    }
    console.log("*********", val)
    query(val)
      .then(result => {
        console.log(result[0].summary_text);
        setDescription(result[0].summary_text);
        setLoading(false)
      })
      .catch(error => {
        console.log("-----", error)
        // Check if the error object has a code property
        if (error.code) {
          console.error('Error code:', error.code);
        } else {
          console.error('Error:', error);
        }
        setLoading(false)
      });


  };



  const content = watch("Content");





  useEffect(() => {
    if (content) {
      setCharCount(content.length);
    } else {
      setCharCount(0);
    }
  }, [content]);


  useEffect(() => {


    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updatePosition);

    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  // Function to navigate the user to the dashboard page
  const toDashboard = () => {
    router.push('/dashboard');
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Dialog
        open={authOpen}
        onClose={handleCloseAuth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: 'rgb(0 0 0 / 43%)', // Adjust the opacity as needed
            backdropFilter: 'blur(4px)', // Adjust the blur radius as needed
            WebkitBackdropFilter: 'blur(10px)', // For Safari support
            border: '1px solid rgba(255, 255, 255, 0.18)',
            width: '70vw'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <p style={{ color: 'white' }}>
            Login
          </p>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <Auth
                supabaseClient={supabase}
                providers={['google']}
                appearance={{ theme: ThemeSupa }}
              />
            </Grid>


          </Grid>

        </DialogContent>

      </Dialog>

      <Box component="section" sx={{ p: 2 }}>

      </Box>

      <AppBar position="sticky" elevation={scrollPosition > 50 ? 4 : 0} color=''>
        <Toolbar>
          <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>
          <Grid container>

            <Grid item sm={4} xs={6}>
              <div className={styles.logoDiv}>
                <img src="/iconblue.png" alt="logo" width="30" height="30" />
                <Box sx={{ p: 1 }}></Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: '16px' }}>EzSummarizer.ai</Typography>

              </div>

            </Grid>


            <Grid container item sm={8} xs={6} style={{ textAlign: 'end', justifyContent: 'flex-end', display: 'flex' }}>
              {
                session ?
                  <div style={{
                    display: "flex",
                    textTransform: "capitalize",
                    alignItems: "center"
                  }}>
                    <div>
                      <Button onClick={() => toDashboard()} style={{ fontFamily: 'var(--font-poppins-bold)', textTransform: 'none', fontWeight: 500, marginRight: '15px' }}>Dashboard</Button>

                    </div>
                    
                    <div>
                      <Avatar sx={{ border: '2px solid #1976d2', width: 30, height: 30 }} alt="User" src={session?.user?.user_metadata?.avatar_url} />
                    </div>
                    <div style={{ paddingLeft: '15px' }}>

                      <IconButton onClick={logOut} aria-label="logOut" size="medium">
                        <LogoutTwoToneIcon fontSize="inherit" />
                      </IconButton>



                    </div>
                    
                  </div>


                  :


                  <Button onClick={() => setAuthOpen(true)} style={{ fontFamily: 'var(--font-poppins-bold)', textTransform: 'none', fontWeight: 500 }}>Log In</Button>

              }

            </Grid>

          </Grid>
          <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>
        </Toolbar>
      </AppBar>

      <Toolbar />


      //Main container for the summarization feature
      <Container style={{
        padding: "84px 25px",
        background: 'aliceblue', borderRadius: '35px',
        marginBottom: '45px',
      }}>
        <Grid container >
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Introducing <span style={{ color: '#007aff' }}>EzSummarizer.ai</span> ✨</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', padding: "15px" }}>
            <Box sx={{ p: 1 }}>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500, fontSize: '1.4rem', color: "grey" }}>

                EzSummarizer is a user-friendly online tool that condenses lengthy texts into concise summaries. With just a few clicks, it helps users quickly grasp the key points of any content, saving time and improving comprehension.

              </Typography>
            </Box>
          </Grid>


        </Grid>

        <Grid container style={{ padding: "15px" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid item container>
              <Grid item xs={12}>
                <textarea rows="10" style={{ fontFamily: "var(--font-poppins)", width: "100%", border: "solid 1px #007aff", borderRadius: "10px", padding: "10px" }} {...register("Content", {
                  required: "This field is required",
                  maxLength: { value: 500, message: "Maximum length is 500 characters" },
                  minLength: { value: 48, message: "Minimum length is 48 characters" }
                })} />

              </Grid>
              <Grid item xs={12} style={{ padding: "0px", display: "flex", justifyContent: "flex-end", margin: "0px", fontSize: "12px" }}>
                {charCount} / 500
              </Grid>
              <Grid item xs={12} style={{ padding: "0px", display: "flex", justifyContent: "flex-end", margin: "0px", fontSize: "12px" }}>
                {errors.Content && <p style={{ color: "red" }}>{errors.Content.message}</p>}
              </Grid>
              <Grid item xs={12} style={{
                display: "flex", justifyContent: "flex-end"
              }}>

                <Button type="submit" variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Summarize</Button>

              </Grid>
            </Grid>


          </form>

        </Grid>
        <Grid container style={{ padding: "15px" }}>
          <Grid item container xs={12} style={{ padding: "15px 0px", position: 'relative' }}>
            {loading ?
              <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                <label>Loading......</label>
                <CircularProgress style={{ filter: 'invert(1) drop-shadow(0 0 0.3rem #ffffff70)' }} />
              </Stack>
              :

              description ?
                <Grid item xs={12} style={{ padding: "15px 15px 50px 15px", border: "solid 1px grey" }}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, color: "#007aff", fontSize: '1.2rem', padding: "0px" }}>

                    Summary
                  </Typography>
                  <Typewriter text={description} delay={30} />
                  <Button onClick={() => { copyToClipboard(description); notify() }} startIcon={<ContentCopyTwoToneIcon />} variant="contained" style={{
                    background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500, position: 'absolute', bottom: "25px",
                    right: "10px"
                  }}>Copy</Button>
                  <ToastContainer hideProgressBar={true} closeOnClick theme={"dark"} />

                </Grid> : <></>


            }

          </Grid>

        </Grid>

        <Grid container >

          <Grid item container xs={12} style={{ padding: "15px", background: "white", borderRadius: "15px" }} >
            <Grid item xs={12} style={{ padding: "15px 15px 0px" }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500, color: "#007aff", fontSize: '1.2rem', padding: "0px" }}>

                Academic research
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: "0px 15px" }}>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '1rem', color: "#4f4f4f" }}>

                Students and scholars can use ezSummarizer to quickly distill long academic papers and articles, making literature reviews more efficient and manageable.

              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: "15px 15px 0px" }}>
              <Divider />
            </Grid>
            <Grid item xs={12} style={{ padding: "15px 15px 0px" }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500, color: "#007aff", fontSize: '1.2rem', padding: "0px" }}>

                Business intelligence
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: "0px 15px" }}>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '1rem', color: "#4f4f4f" }}>

                Professionals can summarize market reports and competitor analyses, allowing for faster decision-making and strategy development.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: "15px 15px 0px" }}>
              <Divider />
            </Grid>
            <Grid item xs={12} style={{ padding: "15px 15px 0px" }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 500, color: "#007aff", fontSize: '1.2rem', padding: "0px" }}>

                News consumption
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: "0px 15px" }}>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '1rem', color: "#4f4f4f" }}>

                Readers can summarize lengthy news articles or reports, enabling them to stay informed on multiple topics without spending excessive time reading full texts.
              </Typography>
            </Grid>

          </Grid>
        </Grid>



      </Container>



      <Grid container style={{ background: '#007aff', padding: '30px 30px' }}>
        <Grid item xs={12}>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{
            fontFamily: 'var(--font-poppins)', fontWeight: 500, color: "white", fontSize: '1.2rem', padding: "0px", display: 'flex',
            alignItems: 'center'
          }}>

            <span><img src="/icon.png" alt="logo" width="50" height="50" /></span><Box component="section" sx={{ p: 1 }}></Box> EzSummarizer.ai
          </Typography>


        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Typography variant="p" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '1rem', color: "white" }}>


          </Typography>

        </Grid>

      </Grid>



    </React.Fragment>
  );
}
