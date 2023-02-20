import React, {FC, ReactElement} from 'react';
import Navbar from "@/component/Navbar";
import {Container} from "@mui/material";
import Player from "@/component/Player";
import Head from "next/head";
import styles from'../style/TrackItem.module.scss'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";





interface ModalProps{
    children:React.ReactNode
    title?:string;
}




const MainLayout:React.FC<ModalProps>=({children,title})=>{
    return (
        < >
            <Head><title>{title || 'SpotifyClon'}</title></Head>
            <Navbar />
            <Container >
                {children}

            </Container>

            <div className={styles.hrefer} >
                <hr/>
            </div>
            <Player/>
        </>
    );
};

export default MainLayout;