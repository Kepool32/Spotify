import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/component/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import {Grid3x3} from "@mui/icons-material";
import FileUpload from "@/component/FileUpload";
import {useInput} from "@/hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {

    const [activeStep,setActiveStep]=useState(0)
    const [picture,setPicture]=useState('')
    const [audio,setAudio]=useState('')
    const name=useInput('')
    const artist=useInput('')
    const text=useInput('')
    const router=useRouter()

    const next=()=>{
        if(activeStep!==2) {
            setActiveStep(prev => prev + 1)
        }else{
            const formData=new FormData()
            formData.append('name',name.value)
            formData.append('text',text.value)
            formData.append('artist',artist.value)
            formData.append('picture',picture)
            formData.append('audio',audio)
            axios.post('http://localhost:5000/tracks',formData)
                .then(resp=>router.push('/track')).catch(e=>console.log(e))
        }

    }

    const back=()=>{

            setActiveStep(prev => prev - 1)

    }


    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep==0 &&
                   <Grid container direction={'column'} style={{padding:20}}>
                       <TextField {...name} style={{marginTop:10}} label={'Название трека'}/>
                       <TextField {...artist} style={{marginTop:10}} label={'Имя исполнителя'}/>
                       <TextField {...text} style={{marginTop:10}} label={'Слова к треку'} multiline rows={3}/>
                   </Grid>

                }
                {activeStep==1 &&
                    <FileUpload setFile={setPicture} accept='image/*' >
                        <Button style={{margin:'0 auto',display:'block'}} >Загрузить изображение</Button>
                    </FileUpload>
                    
                }
                {activeStep==2 &&

                <FileUpload setFile={setAudio} accept='audio/*' >

                    <Button style={{margin:'0 auto',display:'block'}}>Загрузить аудио</Button>
                </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep===0} onClick={back}>
                    <h3>Назад</h3>
                </Button>
                <Button  onClick={next}>
                    <h3>Вперед</h3>
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;