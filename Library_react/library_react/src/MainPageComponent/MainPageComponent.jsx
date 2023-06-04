import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button'

import { booksListNumber, getBooksNumberThunk } from "../Features/booksSlice"
import classes from "./MainPageComponent.module.css"
import { Box } from "@mui/material"
import { useGetBooksNumberQuery } from "../Features/api/apiSlice"

function MainPageComponent() {

  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const date = new Date()
  const {data, isError, isLoading, isFetching} = useGetBooksNumberQuery()
  // useEffect(() => {
  //   dispatch(getBooksNumberThunk())
  // }, [])

  // const booksNumber = useSelector(booksListNumber)
  return (
    <>

      <h1 className={classes.mainTitle}>ՀԱՊՀ ԳՄ գրադարան</h1>
      <div className={classes.backGroundImageDiv}></div>


      <div className={classes.secondImageAndDescription}>
        <div className={classes.secondImage}></div>
        <div className={classes.secondDescription}>
          <h2 className={classes.yearOfLibrary}>Մեր գրադարանը {date.getFullYear() - 1959} տարեկան է</h2>
          <h2 className={classes.libraryCreationData}>Ստեղծվել է 1959 թվականին և <br /> անընդհատ ընդլայնվում է</h2>

          <h2 className={classes.numberOfBooks}>
            {data ?
              `Ընդհանուր ${data} գիրք` :
              'Գրքեր չկան'
            }
          </h2>
        </div>
      </div>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Button className={classes.openLibraryBtn} sx={{
          mt: '5%',
          mb: '5%'
        }} variant="contained" onClick={() => {
          navigate('/categories')
        }}>
          Բացել գրադարանը
        </Button>
      </Box>

    </>
  )
}

export default MainPageComponent