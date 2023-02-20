import React, {useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "@/style/TrackItem.module.scss";
import {Grid, IconButton} from "@mui/material";
import stylese from '../style/Player.module.scss'
import {Track} from "@/types/track";
import TrackProgress from "@/component/TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import TrackProgressSound from "@/component/TrackProgressSound";






let audio:any;



const Player = () => {



    const {pause,volume,active,duration,currentTime}= useTypedSelector(state => state.player)
    const {pauseTrack,playTrack,setVolume,setCurrentTime,setDuration}=useActions()

    useEffect(()=>{
        if(!audio){
            audio=new Audio()

        }else{
            setAudio()
            play()
        }

    },[active])

        const setAudio=()=>{
            if(active){
                audio.src='http://localhost:5000/'+ active.audio
                audio.volume=1
                audio.volume=volume/100
                audio.onloadedmetadata=()=>{
                    setDuration(Math.ceil(audio.duration))
                }
                audio.ontimeupdate=()=>{
                    setCurrentTime(Math.ceil(audio.currentTime))
                }
            }

        }


    const play=()=>{
        if(pause){
            playTrack()
            audio.play()
        }else{
            pauseTrack()
            audio.pause()
        }

    }

    const changeVolume=(e:React.ChangeEvent<HTMLInputElement>)=>{
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))



    }

    const changeCurrentTime=(e:React.ChangeEvent<HTMLInputElement>)=>{
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))



    }

    if(!active){
        return null
    }

    return (
        <div className={stylese.player}>
            <IconButton onClick={play}>
                {pause
                    ?<PlayArrow/>
                    :<Pause/>
                }


            </IconButton>

            <Grid container direction='column' style={{width:200,margin:'0 20px'}} >
                <div> {active?.name}</div>
                <div style={{fontSize:12,color:'gray'}}>{active?.artist}</div>
            </Grid>
                <Grid container direction='column' alignItems='center' justifyContent='center'>
                <div className={stylese.trackprogress}>
                    <TrackProgress  left={currentTime} right={duration} onchange={changeCurrentTime} />
                </div>
                </Grid>


            <VolumeUp style={{marginLeft:'auto'}}/>
            <TrackProgressSound left={volume} right={100} onchange={changeVolume} />
        </div>
    );
};

export default Player