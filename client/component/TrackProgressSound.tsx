import React from 'react';
import styles from '../style/Player.module.scss'
import {Grid} from "@mui/material";

interface TrackProgressProps{
    left:number;
    right:number;
    onchange: (e:any)=>void;


}

const TrackProgress:React.FC<TrackProgressProps> =
    ({
         left,right,onchange,
    }) => {
    return (
        <>
            <input

                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onchange}
                id="volume" name="volume"
                style={{
                    background: `linear-gradient(to right, green 0%, green ${left}%, #ddd ${left}%, #ddd 100%)`,
                    borderRadius: '5px',
                    height: '5px',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                }}
            />
            <div >{left}/{right}</div>
        </>
    );
};

export default TrackProgress;