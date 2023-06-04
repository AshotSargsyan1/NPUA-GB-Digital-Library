import { useSelector } from 'react-redux'

import { categories } from "../Features/categoriesSlice"
import classes from './CategoriesComponent.module.css'
import BookCategoriesComponent from "../BookCategoriesComponent/BookCategoriesComponent"

function CategoriesComponent() {

  const categoriesSelector = useSelector(categories)

  return (
    <>

      <h1 className={classes.titleH1}>Ենթաբաժիններ</h1>
      <div className={classes.categoriesDiv}>
        {categoriesSelector.length !== 0 ? categoriesSelector.map((item, index) => {
          return <BookCategoriesComponent item={item} key={index} />
        }) : <h2 className={classes.errorH2}>Խնդիր, խնդրում ենք փորձել մի փոքր ուշ</h2>}
      </div>


    </>
  )
}

export default CategoriesComponent