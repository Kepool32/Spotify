import React, {useState} from 'react';
import {Track} from "@/types/track";
import MainLayout from "@/layouts/MainLayout";
import {Button, Grid, makeStyles} from "@mui/material";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {styled} from "@mui/material/styles";

const StyledButton = styled(Button)({
    background: 'linear-gradient(180deg, #333333 0%, #000000 100%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});



const TrackPage= ({serverTrack}) => {

        const [track,setTrack]=useState(serverTrack)

        const router=useRouter()

    return (
        <MainLayout title={'Музыкальная площадка - ' + track.name + " - " + track.artist}>
            <StyledButton variant={"outlined"}
                    style={{fontSize:30}}
                    onClick={()=>router.push('/track')}>
                К списку
            </StyledButton>
            <Grid container style={{margin:'20px 0'}}>
                <img src={'http://localhost:5000/'+ track.picture}  alt={''} width={350} height={350}/>
                <div  style={{marginLeft:30}}>
                    <h1>Название трека-{track.name}</h1>
                    <h3>Исполнитель-{track.artist}</h3>
                    <h5>Прослушиваний-{track.listens}</h5>
                </div>
            </Grid>
            <h1>Текст трека:</h1>
            <p>{track.text}</p>
        </MainLayout>
    );
};

export default TrackPage;


export const getServerSideProps:GetServerSideProps=async ({params})=>{
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)

    return {
        props:{
            serverTrack: response.data
        }
    }
}