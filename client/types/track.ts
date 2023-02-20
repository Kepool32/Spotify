export interface Commenet{
    _id:string;
    username:string;
    text:string;



}


export interface Track{
    _id:string;
    name:string;
    artist:string;
    text:string;
    listens:number;
    picture:string;
    audio:string;
    commets:Comment[]


}


export interface TrackState{
    tracks:Track[];
    error:string
}

export enum TrackActionTypes{
    DELETE_TRACKS='DELETE_TRACKS',
    FETCH_TRACKS='FETCH_TRACKS',
    FETCH_TRACKS_ERROR='  FETCH_TRACKS_ERROR'
}
interface FetchTracksAction{
    type:TrackActionTypes.FETCH_TRACKS;
    payload:Track[]
}

interface FetchTracksErrorAction{
    type:TrackActionTypes.FETCH_TRACKS_ERROR;
    payload:string
}

interface DeleteTracksAction{
    type:TrackActionTypes.DELETE_TRACKS;
    payload:string
}


export type TrackAction=FetchTracksErrorAction | FetchTracksAction | DeleteTracksAction