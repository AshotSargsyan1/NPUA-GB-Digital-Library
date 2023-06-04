import { useSelector } from "react-redux"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import * as React from 'react';
import { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { favoriteBooks, getFavoriteBooksThunk, removeFavoriteBook, sendBookIdForDownload } from "../Features/booksSlice";
import { useDispatch } from "react-redux";
import { Box } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import classes from './FavoriteBooksComponent.module.css'

function FavoriteBooksComponent() {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getFavoriteBooksThunk())
    }, [])

    const favoriteBooksSelector = useSelector(favoriteBooks)
    return (
        <>
            <Box sx={{
                width: '60%',
                ml: '20%',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                {favoriteBooksSelector.length > 0 ?
                    favoriteBooksSelector.map((item, index) => {
                        return (
                            <Card sx={{
                                width: '40%',
                                ml: '5%',
                                mb: '5%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between'
                            }} key={index}>
                                <div>
                                    <img src={item.img} className={classes.bookImage} alt="" />
                                    <CardContent>
                                        <Typography variant="h4" className={classes.bookName}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" className={classes.bookDescription}>
                                            {item.description}
                                        </Typography>
                                        <Typography className={classes.bookDescription} sx={{ fontWeight: '600', mt: '5%' }} variant="body2"  >
                                            {item.author}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Box>
                                    <CardActions >
                                        <IconButton sx={{ color: 'black' }} onClick={() => {
                                            dispatch(removeFavoriteBook(item.id))
                                        }}>
                                            <BookmarkRemoveIcon className={classes.btns} sx={{
                                                color: 'black'
                                            }} />
                                        </IconButton>
                                        <IconButton color='primary' onClick={() => {
                                            dispatch(sendBookIdForDownload(item.id))
                                        }}>
                                            <CloudDownloadIcon className={classes.btns} sx={{
                                                color: 'blue'
                                            }} />
                                        </IconButton>
                                    </CardActions>
                                </Box>
                            </Card>
                        )
                    })
                    : <div className = {classes.emptyFavoriteBooksDiv}><h1 className={classes.emptyFavoriteBooks}>Դուք ընտրված գրքեր չունեք</h1></div>}
            </Box >
        </>
    )
}


export default FavoriteBooksComponent