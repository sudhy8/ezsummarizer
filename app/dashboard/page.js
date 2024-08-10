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
import { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import styles from './page.module.css';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { set, useForm } from 'react-hook-form';
import Typewriter from '../TypingEffect';
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
import Ripples from 'react-ripples'
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import TextField from '@mui/material/TextField';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Menu from '@mui/material/Menu';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import MenuItem from '@mui/material/MenuItem';
import { Dropbox } from 'dropbox';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

import { AssemblyAI } from 'assemblyai'
const fileIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" width="100px" height="120px" stroke="#0069ff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>

const folderIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#0069ff" width="64px" height="64px"><path d="M 15.375 15 C 12.852469 15 10.787109 17.066423 10.787109 19.587891 L 10.787109 46.251953 C 10.787109 48.769711 11.338238 50.749451 12.6875 52.072266 C 14.036762 53.39508 16.013124 53.902344 18.470703 53.902344 L 48.324219 53.902344 C 50.188281 53.902344 51.707272 53.59715 52.890625 52.916016 C 54.073978 52.234881 54.870264 51.132805 55.166016 49.845703 C 56.442844 44.292168 56.280824 38.57964 56.257812 31.380859 C 56.257812 28.644179 54.07666 26.496842 51.460938 26.015625 A 1.0001 1.0001 0 0 0 51.279297 26 L 49.757812 26 C 49.676153 23.24049 47.421878 21 44.644531 21 L 33.257812 21 C 32.265487 21 31.364119 20.436916 30.929688 19.544922 L 29.974609 17.580078 C 29.208038 16.003496 27.603284 15 25.849609 15 L 15.375 15 z M 15.375 17 L 25.849609 17 C 26.841934 17 27.742353 17.563661 28.175781 18.455078 L 29.130859 20.419922 C 29.898428 21.995927 31.504139 23 33.257812 23 L 44.644531 23 C 46.335475 23 47.64211 24.331301 47.728516 26 L 26.554688 26 A 1.0001 1.0001 0 0 0 26.375 26.015625 C 23.758353 26.496793 21.578125 28.644483 21.578125 31.380859 C 21.577887 31.395359 21.533535 34.137681 21.361328 37.291016 C 21.188666 40.452676 20.834997 44.112156 20.416016 45.427734 A 1.0001 1.0001 0 0 0 20.416016 45.429688 C 19.818162 47.308163 18.905745 47.638151 18.244141 47.511719 C 17.582536 47.385286 16.787109 46.630599 16.787109 44.953125 L 16.787109 41 A 1.0001 1.0001 0 1 0 14.787109 41 L 14.787109 44.953125 C 14.787109 47.321651 16.086995 49.135995 17.869141 49.476562 C 19.651286 49.81713 21.531166 48.514681 22.320312 46.035156 C 22.930332 44.119735 23.182334 40.604527 23.357422 37.398438 C 23.53251 34.192347 23.578125 31.396484 23.578125 31.396484 A 1.0001 1.0001 0 0 0 23.578125 31.380859 C 23.578125 29.736031 24.94645 28.338764 26.707031 28 L 47.787109 28 L 47.787109 35.447266 A 1.0001 1.0001 0 1 0 49.787109 35.447266 L 49.787109 28 L 51.128906 28 C 52.888436 28.338728 54.257812 29.73634 54.257812 31.380859 A 1.0001 1.0001 0 0 0 54.257812 31.384766 C 54.280853 38.609967 54.417715 44.175074 53.216797 49.398438 C 53.029549 50.213335 52.645475 50.750228 51.892578 51.183594 C 51.139681 51.616959 49.964156 51.902344 48.324219 51.902344 L 18.470703 51.902344 C 16.286282 51.902344 14.919629 51.458014 14.087891 50.642578 C 13.256152 49.827143 12.787109 48.483195 12.787109 46.251953 L 12.787109 19.587891 C 12.787109 18.147358 13.933531 17 15.375 17 z" /></svg>
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

import dbx from "@/app/service/dropbox";

export default function Home() {
    const router = useRouter();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [session, setSession] = useState(null)
    const [audioTrans, setAudioTrans] = useState(null)
    const [youtubeURL, setYoutubeURL] = useState('');
    const [open, setOpen] = React.useState(false);
    const [captionOpen, setCaptionOpen] = React.useState(false);
    const [fileOpen, setFileOpen] = React.useState(false);
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [selectedOut, setselectedOut] = React.useState({});

    const [captions, setCaptions] = React.useState({});
    const [captionTexts, setCaptionTexts] = useState([]);
    const [summary, setSummary] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [textSummaryOpen, setTextSummaryOpen] = useState(false);

    const client = new AssemblyAI({
        apiKey: "2bf1061ce19a48369e3adbabffdb0a44"
    })


    const [audioOpen, setAudioOpen] = React.useState(false);
    const notify = () => toast.success("Recording Started...!");
    const notify2 = () => toast.error("Recording Stopped!");
    const notify3 = () => toast.success("Summarization initiated...!");


    const [file, setFile] = useState(null);
    const [audioLoader, setAudioLoader] = useState(false);
    const [audioLoaderStatus, setAudioLoaderStatus] = useState('');


    function modifyDropboxUrl(url) {
        console.log("Getting url", url)
        if (url?.endsWith('dl=0')) {


            return url.slice(0, -4) + 'raw=1';
        } else {
            return url;
        }
    }


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const [textContent, setTextContent] = useState('');

    const handleTextChange = (event) => {
        setTextContent(event.target.value);
    };

    const sumbitText = () => {
        // Use textContent here for your summarization logic
        console.log('Text to summarize:', textContent);
        // summarization logic here

        callSummarizeAPI(textContent, { type: 'text' });
    };



    const handleUpload = async () => {



        setAudioLoader(true);
        setAudioLoaderStatus('Uploading file...');
        const accessToken = 'sl.B6v4Nj9onYHpqVQZ381Os__L4G1raYfy8N8MXi9jeSTYpxRJzrZVZsMaziyIPwzyig3-roBdK7OJ4amfO5200KQ2Brd4qn44IgbmDTmycbnQsV1nnXnBxiYf6-fScjuP2uc6QVR968pNgEQf3RmGfUk' // Replace with your access token
        const abc = new Dropbox({ accessToken });

        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;

            const fileName = new Date().getTime() + "__" + file.name;
            dbx.filesUpload({
                path: '/' + fileName,
                contents: fileContent
            })
                .then((response) => {
                    console.log('File uploaded successfully:', response);

                    // Creating a shared link for the uploaded file
                    return dbx.sharingCreateSharedLinkWithSettings({
                        path: response.result.path_display
                    });
                })
                .then((sharedLinkResponse) => {
                    console.log('Shared link created:', sharedLinkResponse.result.url);
                    // You can now use sharedLinkResponse.result.url as the link to the uploaded file
                    console.log("file.type", file.type)
                    
                    if (file.type.includes('audio')) {
                        console.log('File type is audio');


                        
                        let newUrl = sharedLinkResponse?.result?.url?.slice(0, -4) + 'raw=1'
                        console.log("newUrl", newUrl)
                        const config = {
                            audio_url: newUrl
                        }

                        const run = async () => {
                            setAudioLoaderStatus('Transcribing audio...');
                            const transcript = await client.transcripts.transcribe(config)
                            console.log(transcript.text)
                            setAudioTrans(transcript.text)
                            setAudioLoader(false);



                            console.log("------", {
                                folder: selectedFolderName,
                                files: files,
                                selectedFolder: selectedFolder,
                            })
                            let temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { url: sharedLinkResponse?.result?.url, type: 'video', }] }
                            setSelectedFolder(temp)
                            console.log("temp", temp)

                            callSummarizeAPI(transcript.text, { type: 'customaudio', url: sharedLinkResponse?.result?.url });
                            



                        }

                        run()



                    }
                    if (file.type.includes('video')) {
                        console.log('File type is video');

                        function modifyDropboxUrl(url) {
                            console.log("Getting url", url)
                            if (url?.endsWith('dl=0')) {
                                return url.slice(0, -4) + 'raw=1';
                            } else {
                                return url;
                            }
                        }


                        const client = new AssemblyAI({
                            apiKey: "2bf1061ce19a48369e3adbabffdb0a44"
                        })

                        const audioUrl = modifyDropboxUrl(sharedLinkResponse?.result?.url);

                        const config = {
                            audio_url: audioUrl
                        }

                        const run = async () => {
                            setAudioLoaderStatus('Transcribing audio...');
                            const transcript = await client.transcripts.transcribe(config)
                            console.log(transcript.text)
                            setAudioTrans(transcript.text)
                            setAudioLoader(false);


                            console.log("------", {
                                folder: selectedFolderName,
                                files: files,
                                selectedFolder: selectedFolder,
                            })
                            let temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { url: sharedLinkResponse?.result?.url, type: 'video', }] }
                            setSelectedFolder(temp)
                            console.log("temp", temp)

                            callSummarizeAPI(transcript.text, { type: 'customvideo', url: sharedLinkResponse?.result?.url });
                            // JJJJ

                        }

                        run()



                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setAudioLoader(false);
                });
        };







        reader.readAsArrayBuffer(file);
        // setFileOpen(false)
    };


    const [files, setFiles] = React.useState({});
    const [selectedFolder, setSelectedFolder] = React.useState(null);
    const [selectedFolderName, setSelectedFolderName] = React.useState(null);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMore = Boolean(anchorEl);
    const morehandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const morehandleClose = () => {
        setAnchorEl(null);
    };


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
                Home: {
                    "__uplodedFiles__": []
                }
            }

            const { data, error } = await supabase
                .from('fileManager')
                .insert([
                    { userId: session?.user?.id, folders: JSON.stringify(param) },
                ])
                .select()


            setFiles({
                Home: {
                    "__uplodedFiles__": []
                }
            })
        }



    }

    useEffect(() => {
        setSelectedFolder(files?.Home)
        setSelectedFolderName('Home')
    }, [files])



    useEffect(() => {
        if (session?.user?.id) {
            fetchData()

        }
    }, [session?.user?.id])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const handleAudioClose = () => {
        setAudioOpen(false);

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
            Home: {
                ...files.Home,
                [name]: {
                    "__uplodedFiles__": []
                }
            },

        }
        console.log("param", param)


        const { data, error } = await supabase
            .from('fileManager')
            .update([{ userId: session?.user?.id, folders: JSON.stringify(param) }])
            .eq('userId', session?.user?.id)
            .select()

        setFiles(param)
        handleClose()




    };

    const onSubmit2 = async (data) => {
        console.log("data", data)
    }
    console.log(errors);

    const addFile = async () => {
        console.log("file", files?.Home);
        
    }

    const searchYoutubeURL = () => {
        setCaptionOpen(true);

        // Access the input element by its ID or use refs
        const inputElement = document.getElementById('youtubeURLInput');

        // Get the value from the input element
        const url = inputElement.value;

        // Regular expression to match YouTube video ID
        // Example URLs:
        // https://www.youtube.com/watch?v=dQw4w9WgXcQ
        // https://youtu.be/dQw4w9WgXcQ
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regex);

        if (match) {
            const videoId = match[1]; // Extracted video ID
            console.log('YouTube Video ID:', videoId);
            


            const out = fetchVideoData(videoId);

            console.log("response", out)
            setYoutubeURL(videoId);
        } else {
            console.error('Invalid YouTube URL');
            // Handle invalid URL case
        }
    }


    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);

    const fetchVideoData = async (video) => {
        try {
            const response = await axios.get(`http://localhost:8000/download_audio/`, {
                params: { url: video },
                responseType: 'blob', // Important to get the response as a Blob
            });

            setAudioBlob(response.data);

            // Optionally, create a URL for the Blob to play or download
            const audioUrl = URL.createObjectURL(response.data);
            const audio = new Audio(audioUrl);
            audio.play();

            // If you need to send this Blob to another API
            // sendAudioToAnotherAPI(response.data);
        } catch (error) {
            console.error('Error downloading audio:', error);
        }
    };

    // Example function to send the audio Blob to another API
    const sendAudioToAnotherAPI = async (audioBlob) => {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.mp3');

            await axios.post('http://another-api.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Audio sent to another API successfully');
        } catch (error) {
            console.error('Error sending audio to another API:', error);
        }
    };


    

    useEffect(() => {
        console.log("Captions", captions?.captions);
        if (captions?.captions && Array.isArray(captions?.captions)) {
            // Extract text from each caption object
            let texts = "";
            texts = texts + captions?.captions?.map(caption => caption?.text);
            setCaptionTexts(texts);
            console.log("Extracted caption texts:", texts);
        } else {
            console.log("No captions found in the response");
        }

    }, [captions])

    const [output, setOutput] = useState(['Recognized speech will appear here...']);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                setOutput(prevOutput => [...prevOutput, ` ${transcript}`]);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setOutput(prevOutput => [...prevOutput, `Error: ${event.error}`]);
            };
        } else {
            console.error('Speech recognition not supported');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startListening = () => {
        setIsListening(true);
        setOutput(['Listening...']);
        recognitionRef.current.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognitionRef.current.stop();
        setOutput(prevOutput => [...prevOutput, '']);
        console.log("output", output.join(''))
        callSummarizeAPI(output.join(''), { type: 'audio' });
    };


    const deleteFolder = (event, value) => {
        event.stopPropagation();

        console.log("folder", value);
    }

    const handleFileClose = () => {
        setFileOpen(false);
    }

    const handleCaptionClose = () => {
        setCaptionOpen(false);
    }

    const clickedFolder = (folder) => {
        console.log("folder", folder);
        console.log("files", files);
        console.log("files['Home'].folder", files?.['Home']);
        console.log("files['Home'].folder", files?.['Home']?.[folder]);
        console.log("files['Home'].folder", files?.['Home']?.[folder]?.__uplodedFiles__);
        console.log("selectedFolder", selectedFolder);


        if (selectedFolder) {
            setSelectedFolder(files?.['Home']?.[folder]);
            setSelectedFolderName(folder);
            console.log("selectedFolder0000000", files?.folder);
            console.log("selectedFolder0000000", folder);


        } else {
            setSelectedFolder(files?.['Home']?.[folder]);
            selectedFolderName(folder);
            debugger;
            console.log("selectedFolder", files?.['Home']?.[folder]);
            console.log("selectedFolder0000000", folder);

        }

    }
    function getFirstFiveAlphabets(text = "Document") {
        // // Filter out non-alphabetic characters
        // let alphabeticChars = text.split('').filter(char => /[a-zA-Z]/.test(char));

        // // Get the first five alphabetic characters
        let firstFive = text.slice(0, 5);

        return firstFive + "..." || "Document";
    }


    const apiUrl = 'http://20.151.83.246:8000/summarize';
    // Function to call the API
    async function callSummarizeAPI(captionTexts, param = { type: 'default' }) {
        notify3();
        setSummaryLoading(true)
        try {

            // Make the POST request
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "text": captionTexts })
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();
            console.log('Summarized Text:', data?.summary);
            setSummary(data?.summary);
            setSummaryLoading(false)


            let temp = {}
            console.log("selectedFolderName-selectedFolderName", selectedFolderName)
            if (param?.type === 'youtube') {

                temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { summary: data?.summary, type: 'youtube', raw: captionTexts, url: youtubeURL }] }
            }
            if (param?.type === 'audio') {

                temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { summary: data?.summary, type: 'audio', raw: captionTexts }] }
            }
            if (param?.type === 'customaudio' || param?.type === 'customvideo') {

                temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { summary: data?.summary, type: param?.type, url: param?.url, raw: captionTexts }] }
            }
            if (param?.type === 'text') {

                temp = { ...selectedFolder, __uplodedFiles__: [...selectedFolder?.__uplodedFiles__, { summary: data?.summary, type: param?.type,raw: captionTexts }] }
            }




            if (selectedFolderName === 'Home') {

                setFiles({ ...files, [selectedFolderName]: temp })
                console.log("files", files)

                const { data, error } = await supabase
                    .from('fileManager')
                    .update([{ userId: session?.user?.id, folders: JSON.stringify({ ...files, [selectedFolderName]: temp }) }])
                    .eq('userId', session?.user?.id)
                    .select()
            }
            else {
                let param = {
                    "Home": {
                        ...files['Home'],
                        [selectedFolderName]: temp

                    }
                }


                setFiles({ ...files, [selectedFolderName]: temp })
                console.log("files", files)

                const { data, error } = await supabase
                    .from('fileManager')
                    .update([{ userId: session?.user?.id, folders: JSON.stringify(param) }])
                    .eq('userId', session?.user?.id)
                    .select()
            }



        } catch (error) {
            console.error('Error:', error);
            setSummaryLoading(false)

        }


    }

    const captionSummarize = () => {
        console.log("captionTexts", captionTexts);
        callSummarizeAPI(captionTexts, { type: 'youtube' });


    }

    const handleTextSummaryOpenClose = () => {
        setTextSummaryOpen(false);
    }
    return (
        <div >

            <Dialog
                open={textSummaryOpen}
                onClose={handleTextSummaryOpenClose}
                PaperProps={{
                    style: {
                        width: '80vw',
                        maxWidth: 'none', // To ensure it doesn't get constrained by default maxWidth
                    },
                }}

            >

                <DialogContent style={{ padding: '0px', width: '100%' }}>


                    <Grid container >

                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Text Summary </Typography>


                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />

                    <Grid container style={{ padding: '15px 20px' }}>
                        {
                            summary &&
                            <Grid item xs={12} >
                                <Grid container >

                                    <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                        <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Summary </Typography>


                                    </Grid>
                                </Grid>
                                <Divider style={{ margin: '10px 0' }} />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                                    <Typewriter text={summary || ''} delay={2} />

                                    </div>
                                    <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>

                            </Grid>
                        }


                        <textarea rows="10" value={textContent}
                            onChange={handleTextChange} style={{ fontFamily: "var(--font-poppins)", width: "-webkit-fill-available", border: "solid 1px #007aff", borderRadius: "10px", padding: "10px" }} />

                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>


                            <Button onClick={() => { setTextSummaryOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Close</Button>

                            <Button onClick={() => sumbitText()} style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Summarize</Button>



                        </Grid>
                    </Grid>





                </DialogContent>


            </Dialog>





            <Dialog
                open={previewOpen}
                onClose={handlePreviewClose}
                PaperProps={{
                    style: {
                        width: '80vw',
                        maxWidth: 'none', // To ensure it doesn't get constrained by default maxWidth
                    },
                }}

            >

                <DialogContent style={{ padding: '0px', width: '100%' }}>


                    <Grid container >

                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Preview </Typography>


                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />

                    <Grid container style={{ padding: '15px 20px' }}>

                        <Grid item xs={12} >

                            <div>

                                {
                                    selectedOut?.type === 'youtube' ?
                                        <iframe width="100%" height="315"
                                            src={`https://www.youtube.com/embed/${selectedOut?.url}`}
                                            frameborder="0"
                                            allow="autoplay; encrypted-media"
                                            allowfullscreen>
                                        </iframe> : <></>
                                }

                                {
                                    selectedOut?.type === 'customaudio' ?
                                        <video width="100%" style={{ height: '60px', maxHeight: '100%' }} controls>
                                            <source src={modifyDropboxUrl(selectedOut?.url)} type="video/mp4" /></video> : <></>
                                }


                                {
                                    selectedOut?.type === 'customvideo' ?
                                        <video width="100%" controls>
                                            <source src={modifyDropboxUrl(selectedOut?.url)} type="video/mp4" /></video> : <></>
                                }

                                <div>
                                    <h2>Summary</h2>
                                    <p>{selectedOut?.summary}</p>
                                </div>
                                <div>
                                    <h2>Raw Data</h2>
                                    <p>{selectedOut?.raw}</p>
                                </div>

                            </div>





                        </Grid>



                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>


                            <Button onClick={() => { setPreviewOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Close</Button>




                        </Grid>
                    </Grid>




                </DialogContent>


            </Dialog>






            <ToastContainer hideProgressBar={true} closeOnClick theme={"dark"} />


            <Dialog
                open={captionOpen}
                onClose={handleCaptionClose}
                PaperProps={{
                    style: {
                        width: '80vw',
                        maxWidth: 'none', // To ensure it doesn't get constrained by default maxWidth
                    },
                }}

            >

                <DialogContent style={{ padding: '0px', width: '100%' }}>


                    <Grid container >

                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Captions </Typography>


                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />

                    <Grid container style={{ padding: '15px 20px' }}>

                        <Grid item xs={12} >
                            {
                                summary &&
                                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                    <p style={{ fontWeight: '500', fontSize: "17px" }}>Summary</p>
                                    {summary}
                                </div>
                            }

                            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                <JsonView src={captions} />

                            </div>
                            <div style={{ height: '250px', overflowY: 'auto' }}>
                                {captionTexts}
                            </div>

                        </Grid>
                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>

                            {audioLoader && <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '14px' }}>{audioLoaderStatus}</Typography>
                            }
                            {/* <Button onClick={() => { setFileOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Cancel</Button> */}


                        </Grid>
                        {
                            audioTrans && !summary &&
                            <Grid item xs={12} >
                                <Grid container >


                                    <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                        <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Transcription 📜 </Typography>


                                    </Grid>
                                </Grid>
                                <Divider style={{ margin: '10px 0' }} />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                                    <Typewriter text={audioTrans || ''} delay={2} />

                                </div>
                            </Grid>
                        }

                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>


                            <Button onClick={() => { setFileOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Cancel</Button>
                            {
                                !summary ? <Button onClick={() => captionSummarize()} variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>
                                    {
                                        summaryLoading ? <CircularProgress style={{ width: '20px', height: '20px' }} /> : "Summarize"

                                    }


                                </Button> : <></>
                            }



                        </Grid>
                    </Grid>




                </DialogContent>


            </Dialog>






            <Dialog
                open={fileOpen}
                onClose={handleFileClose}
                PaperProps={{
                    style: {
                        width: '80vw',
                        maxWidth: 'none', // To ensure it doesn't get constrained by default maxWidth
                    },
                }}

            >

                <DialogContent style={{ padding: '0px', width: '100%' }}>


                    <Grid container >

                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Upload your Video/Audio 🎥 </Typography>


                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />

                    <Grid container style={{ padding: '15px 20px' }}>

                        <Grid item xs={12} >
                            <div className="output" style={{
                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                maxHeight: '250px', overflow: 'auto'
                            }}  >
                                <div style={{ width: 'calc(100% - 120px)' }}>
                                    <input type="file" onChange={handleFileChange} style={{

                                        border: '1px solid #ccc',
                                        display: 'inline-block',
                                        padding: '12px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        width: '100%',
                                        fontFamily: 'var(--font-poppins-bold)'
                                    }} />
                                </div>
                                <div>
                                    {!audioLoader && <Button onClick={handleUpload} disabled={isListening} variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>
                                        Upload</Button>}

                                    {
                                        audioLoader && <CircularProgress
                                            style={{ marginLeft: '-50px' }}
                                            size={24}
                                            thickness={4}
                                        />
                                    }

                                </div>

                            </div>

                        </Grid>
                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>

                            {audioLoader && <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '14px' }}>{audioLoaderStatus}</Typography>
                            }
                            {/* <Button onClick={() => { setFileOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Cancel</Button> */}


                        </Grid>
                        {
                            summary &&
                            <Grid item xs={12} >
                                <Grid container >

                                    <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                        <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Summary </Typography>


                                    </Grid>
                                </Grid>
                                <Divider style={{ margin: '10px 0' }} />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                                    <Typewriter text={summary || ''} delay={2} />

                                </div>
                            </Grid>
                        }
                        {
                            audioTrans &&
                            <Grid item xs={12} >
                                <Grid container >

                                    <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                        <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Transcription 📜 </Typography>


                                    </Grid>
                                </Grid>
                                <Divider style={{ margin: '10px 0' }} />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                                    <Typewriter text={audioTrans || ''} delay={2} />

                                </div>
                            </Grid>
                        }

                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>


                            {/* <Button onClick={() => { setFileOpen(false) }} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Cancel</Button>
                            <Button onClick={handleUpload} variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Summarize</Button> */}


                        </Grid>
                    </Grid>




                </DialogContent>


            </Dialog>




            <Dialog
                open={audioOpen}
                onClose={handleAudioClose}

            >

                <DialogContent style={{ padding: '0px' }}>


                    <Grid container style={{ minWidth: '600px', width: '40%' }}>

                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Record Your Audio 🎙️ </Typography>
                            {!isListening ?

                                <DotLottieReact
                                    style={{ width: '40px', height: '40px', position: 'absolute', right: '20px', top: '10px' }}
                                    src="https://lottie.host/955ba6ae-14d0-4327-a199-4c86beaf5514/ZbkFMeTZPs.json"
                                    loop
                                    autoplay
                                /> :
                                <DotLottieReact
                                    style={{ width: '40px', height: '40px', position: 'absolute', right: '20px', top: '10px' }}
                                    src="https://lottie.host/c5b21150-1410-4c78-934c-8d5b27b00648/QQELoaLnYO.json"
                                    loop
                                    autoplay
                                />
                            }

                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />

                    <Grid container style={{ padding: '15px 20px' }}>

                        <Grid item xs={12} >
                            <div className="output" style={{ maxHeight: '250px', overflow: 'auto' }}>
                                {output.map((line, index) => (
                                    <Typewriter key={index} text={line} delay={30} />
                                    // <p key={index}>{line}</p>
                                ))}
                            </div>

                        </Grid>

                        <Grid item xs={12} >
                            
                            {
                                summary &&
                                <Grid item xs={12} >
                                    <Grid container >

                                        <Grid item xs={12} style={{ padding: '18px 20px 10px' }}>
                                            <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins-bold)', fontWeight: 500, fontSize: '16px' }}>Summary </Typography>


                                        </Grid>
                                    </Grid>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                                        <Typewriter text={summary || ''} delay={2} />

                                    </div>
                                    <Box component="section" sx={{ p: { xs: 1, sm: 2, lg: 5 } }}></Box>

                                </Grid>
                            }
                        </Grid>


                        <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>

                            <Button onClick={() => { stopListening(); setAudioOpen(false); notify2() }} disabled={!isListening} style={{ color: "red", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Stop & Close</Button>
                            <Button onClick={() => { stopListening(); notify2() }} disabled={!isListening} style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Stop & Submit</Button>
                            <Button onClick={() => { startListening(); notify() }} disabled={isListening} variant="contained" style={{ background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}>Start Recording</Button>


                        </Grid>
                    </Grid>




                </DialogContent>


            </Dialog>




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

                            <Grid item xs={12} style={{ padding: '15px 0px 0px', display: 'flex', justifyContent: 'flex-end' }}>

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
                    <Grid item container spacing={1} xs={12} style={{ padding: '10px', background: 'aliceblue', margin: '10px 0px' }}>
                        {/* <Grid item xs={6}>

                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    style={{
                                        fontFamily: "var(--font-poppins)",
                                        border: "solid 1px #007aff",
                                        borderRadius: "10px",
                                        padding: "14px",
                                        width: 'calc(100% - 20px)',

                                    }}
                                    type="text"
                                    placeholder="youtubeURL"
                                    id="youtubeURLInput"
                                />
                                <Button
                                    onClick={searchYoutubeURL}
                                    variant="contained"
                                    style={{
                                        position: 'absolute',
                                        right: '0px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: "#cce4ff",
                                        color: "#0069ff",
                                        boxShadow: "none",
                                        fontFamily: "var(--font-poppins-bold)",
                                        textTransform: "none",
                                        fontWeight: 500,
                                        minWidth: 'auto', // Adjust button width as needed
                                        padding: '5px 10px', // Adjust padding as needed
                                        borderRadius: '6px'
                                    }}
                                >
                                    Search
                                </Button>
                            </div>
                        </Grid> */}
                        <Grid item xs={4} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            // padding:" 0px 0px 0px 10px"
                        }}>
                            <Button onClick={() => { setAudioOpen(true); setSummary('') }} variant="contained" style={{ width: 'calc(100% - 0px)', marginLeft: '10px', background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }}
                                startIcon={
                                    !isListening ?

                                        <MicRoundedIcon /> :
                                        <DotLottieReact
                                            style={{ width: '40px', height: '40px' }}
                                            src="https://lottie.host/c5b21150-1410-4c78-934c-8d5b27b00648/QQELoaLnYO.json"
                                            loop
                                            autoplay
                                        />




                                }>
                                Audio
                            </Button>
                        </Grid>

                        <Grid item xs={4} style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button onClick={() => {setTextSummaryOpen(true); setSummary('') }} variant="contained" style={{ width: '100%', background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }} startIcon={<SubjectRoundedIcon />}>
                                Text
                            </Button>
                        </Grid>
                        <Grid item xs={4} style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button onClick={() => {setFileOpen(true); setSummary('') }} variant="contained" style={{ width: '100%', background: "#cce4ff", color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 500 }} startIcon={<FileUploadRoundedIcon />}>
                                Upload

                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

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
                    <Grid item xs={12}>
                        <div className={styles.mainFolder}>

                            {
                                selectedFolder && Object.keys(selectedFolder).filter(folder => folder !== '__uplodedFiles__').map((folder) => {
                                    return <div key={folder} style={{ margin: '10px', cursor: 'pointer', position: 'relative' }}>
                                        <IconButton style={{
                                            position: 'absolute',
                                            top: '0px',
                                            right: '0',
                                            color: "#0069ff", boxShadow: "none",
                                            zIndex: 999
                                        }}
                                            id="demo-positioned-button"
                                            aria-controls={openMore ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMore ? 'true' : undefined}
                                            onClick={morehandleClick}>
                                            <MoreVertRoundedIcon fontSize='small' />
                                        </IconButton>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={openMore}
                                            onClose={morehandleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    boxShadow: '0px 0px 0px 2px #d0d0d005',
                                                    paddingTop: '0px',
                                                    paddingBottom: '0px',
                                                },
                                                '& .MuiList-root': {
                                                    paddingTop: '0px',
                                                    paddingBottom: '0px',
                                                },

                                            }}
                                        >
                                            <MenuItem style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 400, fontSize: '12px', margin: '0' }} onClick={morehandleClose}>Rename</MenuItem>
                                            <MenuItem style={{ color: "#0069ff", boxShadow: "none", fontFamily: "var(--font-poppins-bold)", textTransform: "none", fontWeight: 400, fontSize: '12px', margin: '0' }} onClick={(event) => deleteFolder(event, folder)}>Delete</MenuItem>

                                        </Menu>

                                        <Ripples color="#ddefff" >

                                            <div className={styles.folderDiv} onClick={() => clickedFolder(folder)}>
                                                <div>

                                                    <svg width={60} height={60}>
                                                        {folderIcon}
                                                    </svg>
                                                </div>
                                                <div>

                                                    <Typography variant="p" component="div" style={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis", fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '14px', color: "#0069ff"
                                                    }}>{folder}</Typography>

                                                </div>

                                            </div>

                                        </Ripples>
                                    </div>








                                })
                            }






                        </div>


                        <div>
                            {selectedFolder?.__uplodedFiles__
                                && selectedFolder?.__uplodedFiles__
                                    ?.length > 0 && (
                                    <div className="uploaded-files-section" style={{ display: 'flex',flexWrap:'wrap' }}>

                                        {selectedFolder.__uplodedFiles__
                                            .map((file, index) => (
                                                <div key={index} style={{ margin: '10px', cursor: 'pointer', position: 'relative', width: '100px' }}>



                                                    <Ripples color="#ddefff" >

                                                        <div onClick={() => { setPreviewOpen(true); setselectedOut(file) }} className={styles.folderDiv} >
                                                            <div>

                                                                <svg width={40} height={60}>
                                                                    {fileIcon}
                                                                </svg>
                                                            </div>
                                                            <div>

                                                                <Typography variant="p" component="div" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 400, fontSize: '14px', color: "#0069ff" }}>{getFirstFiveAlphabets(file?.raw)}</Typography>

                                                            </div>

                                                        </div>

                                                    </Ripples>
                                                </div>
                                            ))}
                                    </div>
                                )}
                        </div>


                        {/* <p>{
                        JSON.stringify(files?.Home)
                        }</p> */}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
