import { Outlet } from "react-router-dom";

import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent"
import SearchedBooksComponent from "../SearchedBooksComponent/SearchedBooksComponent";
import { useSelector } from "react-redux";
import { searchedBooks } from "../Features/booksSlice";
import classes from './LayoutComponent.module.css'

function LayoutComponent() {

    const searchedBooksSelector = useSelector(searchedBooks)

    return (
        <div className={classes.fullPage}>
            <HeaderComponent />
            {searchedBooksSelector && searchedBooksSelector.length > 0 ?
                <SearchedBooksComponent /> : <Outlet />}
            <FooterComponent />
        </div>
    )
}

export default LayoutComponent