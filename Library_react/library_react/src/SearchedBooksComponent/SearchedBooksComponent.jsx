import Box from '@mui/material/Box';
import { searchedBooks, sendBookIdForDownload, setFavoriteBookThunk } from '../Features/booksSlice'
import { useDispatch, useSelector } from 'react-redux'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { isLogged } from '../utils';
import classes from './SearchedBooksComponent.module.css'

function SearchedBooksComponent() {

  const searchedBooksSelector = useSelector(searchedBooks)
  const dispatch = useDispatch()

  return (
    <>
      {searchedBooksSelector.length > 0 ?
        searchedBooksSelector.map((item, index) => {
          return (
            <Card sx={{
              display: 'flex',
              height: 'auto',
              width: '60%',
              ml: '20%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: '3%',
            }} key={index}>
              <CardContent sx={{ display: 'flex' }}>
                <div style={{
                  marginRight: '2%'
                }}>
                  <img className={classes.bookImg} src={item.img} />
                </div>
                <Box>
                  <Typography variant="h6" className={classes.itemName}>
                    {item.name}
                  </Typography>
                  <Typography className={classes.itemDescription} >
                    {item.description}
                  </Typography>
                  <Typography variant="body2" className={classes.itemAuthor} sx={{
                    fontWeight: 'bold'
                  }} >
                    {item.author}
                  </Typography>
                  <Typography variant="body2" className={classes.itemAuthor}>
                    {item.language}; {item.dataEdition}
                  </Typography>
                </Box>
              </CardContent>
              {isLogged &&
                <CardActions>
                  <IconButton onClick={() => {
                    dispatch(setFavoriteBookThunk(item))
                  }
                  }>
                    <BookmarksIcon sx={{ color: 'black' }} className={classes.btns} />
                  </IconButton>
                  <IconButton onClick={() => {
                    dispatch(sendBookIdForDownload(item._id))
                  }} color='primary'>
                    <CloudDownloadIcon className={classes.btns} />
                  </IconButton>

                </CardActions>
              }
            </Card>
          )
        }) : null}
    </>
  )
}

export default SearchedBooksComponent
