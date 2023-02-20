import { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationList = ({
                        totalItems,
                        itemsPerPage,
                        currentPage,
                        onPageChange,
                    }: PaginationProps) => {
    const [maxButtons] = useState(5); // number of buttons in the group
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const buttons = [];

    const handleClick = (page: number) => {
        onPageChange(page);
    };

    // prepare buttons
    let from = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let to = Math.min(totalPages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);

    for (let i = from; i <= to; i++) {
        buttons.push(
            <Button
                key={i}
                variant={i === currentPage ? 'contained' : 'outlined'}
                onClick={() => handleClick(i)}
            >
                {i}
            </Button>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <ButtonGroup size="small">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => handleClick(currentPage - 1)}
                >
                    Prev
                </Button>
                {buttons}
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => handleClick(currentPage + 1)}
                >
                    Next
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default PaginationList;