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
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import TextField from '@mui/material/TextField';


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
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [session, setSession] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [files, setFiles] = React.useState({});


    const fetchData = async () => {


        let { data: fileManager, error } = await supabase
            .from('fileManager')
            .select("*")

            // Filters
            .eq('userId', session?.user?.id)

        if (fileManager[0]) {
            console.log("fileManager", JSON.parse(fileManager[0]?.folders))

            setFiles(JSON.parse(fileManager[0]?.folders))

        }
        else {
            let param = {
                Home: {}
            }

            const { data, error } = await supabase
                .from('fileManager')
                .insert([
                    { userId: session?.user?.id, folders: JSON.stringify(param) },
                ])
                .select()
            
            
            setFiles({ Home: {} })
        }

    }


    useEffect(() => {
        if (session?.user?.id) {
            fetchData()

        }
}, [session?.user?.id])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("session", session)
            setSession(session)
            if (!session) {
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

    const newFolder = () => {
        handleClickOpen()
    }

    
    const onSubmit = async (folderName) => {

        console.log("----------------------", folderName?.folder)
        console.log("-----------session-----------", session?.user?.id)
        var name = folderName?.folder
        let param = {
            [folderName?.folder]: {}
        }

        const { data, error } = await supabase
            .from('fileManager')
            .insert([
                { userId: session?.user?.id, folders: JSON.stringify(param) },
            ])
            .select()

        
    };
    console.log(errors);


    return (
        <div >

            <Dialog
                open={open}
                onClose={handleClose}
               
            >

                    <DialogContent style={{ padding: '0px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <Grid container style={{ minWidth: '600px', width: '40%' }}>

                            <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Create New Folder</Typography>

                            </Grid>
                        </Grid>
                        <Divider style={{ margin: '10px 0' }} />

                        <Grid container style={{ padding: '15px 20px' }}>

                            <Grid item xs={12} >
                                <input style={{ fontFamily: "var(--font-poppins)", border: "solid 1px #007aff", borderRadius: "10px", padding: "10px", width: 'calc(100% - 20px)' }} type="text" placeholder="folder" {...register("folder", { required: true })} />

                            </Grid>
                            <Grid item xs={12} style={{ padding: "0px", display: "flex", justifyContent: "flex-end", margin: "0px", fontSize: "12px" }}>
                                {errors.Content && <p style={{ color: "red" }}>{errors.Content.message}</p>}
                            </Grid>

                            <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent:'flex-end' }}>

                                <Button style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }} onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Create</Button>


                            </Grid>
                        </Grid>

                       
                    </form>

                    </DialogContent>
                    

            </Dialog>

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
            <Container style={{ padding: "15px" }}>


                <Grid container>
                    <Grid item container gap={2} xs={12}>
                        <Grid item xs={12}>
                            <div className={styles.newFolderDiv}>
                                <Button onClick={newFolder} variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }} startIcon={<AddRoundedIcon />}>
                                    New Folder
                                </Button>
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
