import React from "react"
import { Divider, Avatar, Grid, Paper } from "@mui/material";
import Rating from '@mui/material/Rating';

const Comment = ({comment}) => {
    return (
        <main>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "1%"}}>
                    <h4 style={{ margin: 0, textAlign: "left", paddingRight: "2%"}}>{comment.author}</h4>
                    <Rating precision={0.5} readOnly value={comment.score}/>
                </div>
                <p style={{ textAlign: "left" }}>
                {comment.text}
                </p>
            </Grid>
        </main>
    )
}

export default Comment