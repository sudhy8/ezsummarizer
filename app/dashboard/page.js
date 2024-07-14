'use client';
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
import Typewriter from '../TypingEffect';
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
import { styled } from '@mui/material/styles';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));
export default function Home() {
    const router = useRouter();

    const [session, setSession] = useState(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("session", session)
            setSession(session)
            if(!session){
                router.push('/');
            }
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("session", session)
            setSession(session)
            if (!session) {
                router.push('/');
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        } else {
            router.push('/');

        }
    }

    return (
        <div style={{
           
        }}>
            <StyledAppBar position="sticky" elevation={0} color=''>
                <Toolbar>
                    <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>
                    <Grid container style={{ display: 'flex', alignItems: "center", }}>

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
                                        alignItems: "center",

                                    }}>
                                        

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
            </StyledAppBar >
            <Container style={{padding:"15px"}}>
                

                <Grid container>
                    <Grid item container gap={2} xs={12}>
                        <Grid item xs={3} >
                            <div className={styles.card1} style={{ padding: "15px" }}>
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                            </div>
                        
                        </Grid>
                        <Grid item xs={3} >
                            <div className={styles.card1} style={{ padding: "15px" }}>
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                            </div>

                        </Grid><Grid item xs={3} >
                            <div className={styles.card1} style={{ padding: "15px" }}>
                                ABChghjsf fhsdfk jhsdfkjs dfhjdhf
                            </div>
                        
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
