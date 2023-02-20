import React, {useState} from 'react';
import {Track} from "@/types/track";
import {Box, Grid} from "@mui/material";
import TrackItem from "@/component/TrackItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from '../style/TrackItem.module.scss'
import PaginatedList from "@/component/PaginatedList";
import PaginationList from "@/component/PaginatedList";



interface TrackListProps{

    tracks:Track[]
}
const gradientBackgrounds = [
    'linear-gradient(to right, #f80759, #bc4e9c)',
    'linear-gradient(to right, #00c6ff, #0072ff)',
    'linear-gradient(to right, #ff5e62, #ff9966)',
    'linear-gradient(to right, #fddb92, #d1fdff)',
];

const TrackList:React.FC<TrackListProps> = ({tracks}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;


    const renderItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return (


            <Box p={5} sx={{ marginTop: 2, marginBottom: 2 }}>

                <Grid container spacing={12}   >
                    {tracks.slice(startIndex, endIndex).map(tracks=>

                        <Grid item xs={12} sm={6} md={3}  key={tracks._id}  >


                                    <TrackItem


                                        track={tracks}/>



                        </Grid>


                    )}
                </Grid>

            </Box>
        );
    };

    const handlePageChange = (page: number) => {
            setCurrentPage(page);
        };
    return (


        <>
            {renderItems()}
            <PaginationList
                totalItems={tracks.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
    };


export default TrackList;
