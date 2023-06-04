import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { books, sendBookIdForDownload, setFavoriteBookThunk } from '../Features/booksSlice'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { isLogged } from '../utils';
import classes from './BookComponent.module.css'

function BookComponent() {

  const booksList = useSelector(books)
  const dispatch = useDispatch()

  return (

    <Box sx={{
      width: '60%',
      ml: '20%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}>
      {booksList?.length > 0 ?
        booksList.map((item, index) => {
          return <Card sx={{
            width: '40%',
            mb: '5%',
            display: 'flex',
            flexDirection: 'column'
          }} key={index}>
            <img className={classes.bookImage} src={item.img} alt="No image" />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
              <CardContent>
                <Typography className={classes.bookName} variant="h4">
                  {item.name}
                </Typography>
                <Typography className={classes.bookDescription} variant="body2" >
                  {item.description}
                </Typography>
                <Typography className={classes.bookAuthor} variant="body2" >
                  {item.author}
                </Typography>
                <Box sx={{ display: 'flex', marginRight: '5%' }}>
                  <p style={{ marginRight: '5%' }}>{item.language}</p>
                  <p style={{ fontWeight: 'bold' }}>{item.dataEdition}թ․</p>
                </Box>
              </CardContent>

              <Box>
                {isLogged &&
                  <CardActions sx={{
                    mb: '5%',
                  }}>

                    <IconButton onClick={() => {
                      dispatch(setFavoriteBookThunk(item))
                    }
                    }>
                      <BookmarksIcon className={classes.btns} sx={{
                        color: 'black'
                      }} />
                    </IconButton>
                    <IconButton onClick={() => {
                      dispatch(sendBookIdForDownload(item._id))
                    }} >
                      <CloudDownloadIcon className={classes.btns} sx={{
                        color: 'blue'
                      }}
                      />
                    </IconButton>

                  </CardActions>
                }
              </Box>
            </Box>
          </Card>
        }) : <div style={{
          width: '80%',
          marginLeft: '10%',
          textAlign: 'center'
        }}><h2 className={classes.errorH2}>Խնդիր, խնդրում ենք փորձել մի փոքր ուշ</h2></div>}
    </Box>
  )
}

export default BookComponent



