import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, makeStyles} from "@mui/material";
import Navbar from "@/component/Navbar";
import MainLayout from "@/layouts/MainLayout";
import  styles from  '../style/index.module.scss'
import {Link} from "react-scroll";
import {MusicNote, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";


const Index = () => {
    const router=useRouter()
    const lastElement=useRef<any>()
    const observer=useRef<IntersectionObserver | null>(null)


    useEffect(()=>{


        var callback: IntersectionObserverCallback = function(entries, observer) {
            if(entries[0].isIntersecting){

                entries.forEach((entry) => {
                    const lastElementRef = lastElement.current;

                    if (entry.target === lastElementRef && entry.isIntersecting) {
                        lastElementRef.classList.add(styles.tiltinfwdtr);
                    } else {
                        lastElementRef.classList.remove(styles.tiltinfwdtr);
                        lastElementRef.classList.add(styles.swingouttopbck);
                    }
                })
            }


        };

        observer.current = new IntersectionObserver(callback);
       observer.current?.observe(lastElement.current)

        return () => {
            observer.current?.disconnect();
        };


    },[])


    const musicButtonStyles = {
        margin:'50px',
        borderRadius: '25px',
        border: '2px solid #4CAF50',
        backgroundColor: 'transparent',
        color: '#4CAF50',
        padding: '25px 50px',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#4CAF50',
            color: '#FFFFFF'
        }
    };


    return (

        <>
        <MainLayout>

            <div className={styles.center} >
            <h1 className={styles.trackingincontractbcktop}>Добро пожаловать</h1>
            <h3 className={styles.trackinginexpandfwd}>Здесь собраны лучшие треки</h3>

            </div>
            <div className={styles.trackimg} >
                        <div className={styles.imageContainer}>
                            <h1>Лучшие Реп исполнители </h1>
                            <img className={styles.trackpicture} src='https://i.ytimg.com/vi/sDh_kFP-ppk/maxresdefault.jpg?9289889566'/>
                        </div>

                        <div className={styles.imageContainer}>
                            <h1>Лучшие Хип-хоп исполнители </h1>
                            <img  className={styles.trackpicture} src='https://img.tsn.ua/cached/018/tsn-044a03ab1c6615c0753d2de60e24b711/thumbs/1200x630/c5/e1/21741f3ca2ac05c0b302998d788ce1c5.jpeg'/>
                        </div>
            </div>
            <div  className={styles.pictureItem} >
                <h1>Лучшие хиты </h1>
                <img ref={lastElement}

                     src='https://images.universal-music.de/img/assets/434/434969/4/720/thunder.jpg'/>
            </div>
            <Grid container direction='column' alignItems='center' >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<MusicNote />}
                    style={musicButtonStyles}
                    onClick={()=>router.push('/track')}

                >
                    Переходи быстрей !
                </Button>
            </Grid>
        </MainLayout>


        </>
    );
};

export default Index;
