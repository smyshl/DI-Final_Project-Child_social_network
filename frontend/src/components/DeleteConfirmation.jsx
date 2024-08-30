import { useContext } from "react";
import { Box, Button } from "@mui/material";

import { FeedContext } from "./Feed.jsx";

function DeleteConfirmation({action, onClose, onConfirm}) {

    const { refreshFeed, setRefreshFeed } = useContext(FeedContext);

    const yesClick = () => {
        onConfirm();
        onClose();
        setRefreshFeed(!refreshFeed)
    };

    return (
        <>
            <h2>{action}</h2>

            <Box sx={{ m: 1}}>
            <Button variant='contained' onClick={yesClick} sx={{ m: 2}} color="error">
                Yes
            </Button>

            <Button variant='contained' onClick={onClose} sx={{ m: 2 }} color="success">
                No
            </Button>
            </Box>
        </>
    )
};


export default DeleteConfirmation;