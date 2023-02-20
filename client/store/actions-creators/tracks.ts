import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "@/types/track";
import axios from "axios";


export const fetchTraks=()=>{
    return async (dispatch:Dispatch<TrackAction>)=>{
        try{

            const responce=await axios.get('http://localhost:5000/tracks')
            dispatch({type:TrackActionTypes.FETCH_TRACKS,payload:responce.data})
        }catch (e){
            dispatch({
                type:TrackActionTypes.FETCH_TRACKS_ERROR,
                payload:'Произошла ошибка при загрузке треков'
            })
        }
    }
}

export const searchTraks=(query:string)=>{
    return async (dispatch:Dispatch<TrackAction>)=>{
        try{

            const responce=await axios.get('http://localhost:5000/tracks/search?query='+query)
            dispatch({type:TrackActionTypes.FETCH_TRACKS,payload:responce.data})
        }catch (e){
            dispatch({
                type:TrackActionTypes.FETCH_TRACKS_ERROR,
                payload:'Произошла ошибка при загрузке треков'
            })
        }
    }
}


export const deleteTraks=(id:string)=>{
    return async (dispatch:Dispatch<TrackAction>)=>{
        try{

            const responce=await axios.delete('http://localhost:5000/tracks/'+id)
            dispatch({type:TrackActionTypes.DELETE_TRACKS,payload:responce.data})

        }catch (e){
            dispatch({
                type:TrackActionTypes.FETCH_TRACKS_ERROR,
                payload:'Произошла ошибка при загрузке треков'
            })
        }
    }
}