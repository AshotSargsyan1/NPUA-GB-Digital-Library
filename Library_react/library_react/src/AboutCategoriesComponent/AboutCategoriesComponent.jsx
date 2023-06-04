import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { aboutCategoriesInfo, getAboutCategoriesThunk } from '../Features/categoriesSlice'
import { getBooks } from '../Features/booksSlice'

import BookComponent from '../BookComponent/BookComponent'
import classes from './AboutCategoriesComponent.module.css'
import { Box } from '@mui/material'

function AboutCategoriesComponent() {

  const dispatch = useDispatch()
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      dispatch(getAboutCategoriesThunk(category))
      dispatch(getBooks(category))
    }
  }, [category])

  const aboutCategories = useSelector(aboutCategoriesInfo)

  return (
    <Box>

      {Object.keys(aboutCategories).length ?

        <div className={classes.mainDiv}>
          <h1 className={classes.aboutCategoriesTitle}>{aboutCategories.title}</h1>
          <div className={classes.imgDiv}>
            <img className={classes.aboutCategoriesImg} src={aboutCategories.img} />
          </div>
          <div className={classes.aboutCategoriesDiv}>
            <p className={classes.aboutCategories}>{aboutCategories.aboutGenre}</p>
          </div>
        </div> : null}

      <h2 className={classes.materialsH2}>Նյութեր՝</h2>

      <BookComponent />

    </Box>
  )
}

export default AboutCategoriesComponent