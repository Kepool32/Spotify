import { Grid } from '@mui/material';
import React from 'react';
import styles from '../style/Player.module.scss'


interface TrackProgressProps{
    left:number;
    right:number;
    onchange: (e:any)=>void;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?:'null' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?:'null' |'center'| 'flex-end';

}

const TrackProgress:React.FC<TrackProgressProps> =
    ({
         left,right,onchange, direction, justifyContent,alignItems
    }) => {
    return (
        <Grid container direction='column' alignItems='center' justifyContent='center'>
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
                    width: '100%',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                }}
            />
            <div >{left}/{right}</div>
        </Grid>
    );
};

export default TrackProgress;