import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {Track} from "@/types/track";
import TrackList from "@/component/TrackList";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import {NextThunkDispatch, wrapper} from "@/store";
import {RootState} from "@/store/reducers";
import {fetchTraks, searchTraks} from "@/store/actions-creators/tracks";
import {GetServerSideProps} from "next";
import {store} from "next/dist/build/output/store";
import {useDispatch} from "react-redux";
import {any} from "prop-types";

const Index = () => {
    const router=useRouter()
    const {tracks,error}=useTypedSelector(state=>state.track)



    if(error){
        return <MainLayout><h1>{error}</h1></MainLayout>
    }


    return (
        <MainLayout title={'SpotifyClon-Список треков'} >
           <Grid >
                <Card style={{backgroundColor:'black'}}>
                    <Box p={3}>
                        <Grid container justifyContent='center'>
                            <h2 style={{color:'white'}}>Список треков</h2>
                        </Grid>

                        <Grid container justifyContent='flex-end'>

                            <Button onClick={()=>router.push('/track/create')}>Загрузить</Button>
                        </Grid>
                     </Box>

                    <TrackList tracks={tracks} />
                </Card>
           </Grid>
        </MainLayout>
    );
};

export default Index;

/*export const getServerSideProps=wrapper.getServerSideProps(  async ({store})=>{
    const dispatch=store.dispatch as NextThunkDispatch
    await dispatch(await fetchTraks())
    }
)*/


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, res }) => {
            const dispatch=store.dispatch as NextThunkDispatch
            await dispatch(fetchTraks());
        });
