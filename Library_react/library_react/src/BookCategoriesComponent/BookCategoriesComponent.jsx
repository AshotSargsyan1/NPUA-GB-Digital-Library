import { useNavigate } from 'react-router-dom'

import classes from './BookCategoriesComponent.module.css'

function BookCategoriesComponent({ item }) {

  const navigate = useNavigate()

  return (
    <div className={classes.mainDiv} onClick={() => {
      navigate(`/books/${item.type}`)
    }}>

      <img className={classes.imgSize} alt='Empty' src={item.img} />
      <h2 className={classes.title}>{item.title}</h2>

    </div>
  )
}

export default BookCategoriesComponent



