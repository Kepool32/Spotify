import React, {useEffect, useState} from 'react';
import {Track} from "@/types/track";
import {Card, createStyles, Grid, IconButton, makeStyles, Theme} from "@mui/material";
import styles from'../style/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "@/store";
import {deleteTraks} from "@/store/actions-creators/tracks";








interface TrackItemsProps{
    track:Track;
    active?:boolean


}







const TrackItem:React.FC<TrackItemsProps> = ({track,active=false}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(()=>{




    })
    const gradientBackgrounds = [
        'linear-gradient(to right, #f80759, #bc4e9c)',
        'linear-gradient(to right, #00c6ff, #0072ff)',
        'linear-gradient(to right, #ff5e62, #ff9966)',
        'linear-gradient(to right, #fddb92, #d1fdff)',
        'linear-gradient(90deg, #cfecd0, #ffc5ca)',
        'linear-gradient(4deg, #5462c3, #ba872c)',
        'linear-gradient(66deg, #e38010, #1535bf)'
    ];
    const randomIndex = Math.floor(Math.random() * gradientBackgrounds.length);
    const randomBackground = gradientBackgrounds[randomIndex];

    let del=false
    const router=useRouter()
    const dispatch=useDispatch() as NextThunkDispatch
    const{playTrack,pauseTrack,setActive}=useActions()
    const play= (e:any)=>{
        del=true
        e.stopPropagation()
        setActive(track)
        playTrack()

    }



    const deletes:any=async (e:any,id:any)=>{
        setIsDeleting(true);
        e.stopPropagation()
        await dispatch( deleteTraks(id))
    }



    return (
        <Card className={ styles.track}  onClick={()=>router.push('/track/'+track._id)} style={{ background: randomBackground }}>
            <Grid container direction='row' justifyContent='center' alignItems='center'  >
                <Grid>
            <IconButton onClick={(e)=>play(e)}>
                {!active
                    ?<PlayArrow/>
                    :<Pause/>
                }

                <img src={'http://localhost:5000/'+ track.picture} className={styles.picture} />

            </IconButton>
            </Grid>
                <Grid>
                <IconButton onClick={(e)=>deletes(e,track._id)} style={{marginLeft:"auto"}}>
                    <Delete  />
                </IconButton>
                </Grid>
            </Grid>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid>
               <div> {track.name}</div>
                </Grid>
                <Grid>
                <div style={{fontSize:12,color:'gray'}}>{track.artist}</div>
                </Grid>
            </Grid>

        </Card>
    );
};

export default TrackItem;