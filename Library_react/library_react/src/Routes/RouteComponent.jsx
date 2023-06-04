import { Routes, Route, Navigate } from 'react-router-dom'

import AboutCategoriesComponent from '../AboutCategoriesComponent/AboutCategoriesComponent'
import AboutUsComponent from '../AboutUsComponent/AboutUsComponent'
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent'
import CrudComponent from '../CrudComponent/CrudComponent'
import FeedbackComponent from '../FeedbackComponent.jsx/FeedbackComponent'
import MainPageComponent from '../MainPageComponent/MainPageComponent'
import PageNotFoundComponent from '../PageNotFoundComponent/PageNotFoundComponent'
import LayoutComponent from '../LayoutComponent/LayoutComponent'
import SignInComponent from '../SignInComponent/SignInComponent'
import SignUpComponent from '../SignUpComponent/SignUpComponent'
import ProfileComponent from '../ProfileComponent/ProfileComponent'
import FavoriteBooksComponent from '../FavoriteBooksComponent/FavoriteBooksComponent'
import { isLogged } from '../utils'
import SearchedBooksComponent from '../SearchedBooksComponent/SearchedBooksComponent'
import { useSelector } from 'react-redux'
import {  profileMess } from '../Features/profileSlice'
import ActivitiesWithBooks from '../ActivitiesWithBooks/ActivitiesWithBooks'
import ArchiveOfBooksGivenToStudentsComponent from '../ArchiveOfBooksGivenToStudents/ArchiveOfBooksGivenToStudentsComponent'
import FeedbackMessagesComponent from '../FeedbackMessagesComponent/FeedbackMessagesComponent'
import RemovedFeedbackMessagesComponent from '../RemovedFeedbackMessagesComponent/RemovedFeedbackMessagesComponent'

function RouteComponent() {

  const user = useSelector(profileMess)

  return (
    <Routes>
      <Route element={<LayoutComponent />}>
        <Route path='/' element={<MainPageComponent />} />
        <Route path='/categories' element={<CategoriesComponent />} />
        <Route path='/books/:category' element={<AboutCategoriesComponent />} />
        <Route path='/feedback' element={<FeedbackComponent />} />
        <Route path='/aboutUs' element={<AboutUsComponent />} />
        <Route path='/signin' element={!isLogged ? <SignInComponent /> : <Navigate to='/' />} />
        <Route path='/signup' element={!isLogged ? <SignUpComponent /> : <Navigate to='/' />} />
        <Route path='/profile' element={isLogged ? <ProfileComponent /> : <Navigate to='/signin' />} />
        <Route path='/searchbooks' element={<SearchedBooksComponent />} />
        <Route path='/favoritebooks' element={isLogged ? <FavoriteBooksComponent /> : <Navigate to='/signin' />} />
        <Route path='*' element={<PageNotFoundComponent />} />
      </Route>
      <Route path='/crud' element={user.Role === 'Admin' ? <CrudComponent /> : <PageNotFoundComponent /> } />
      <Route path='/activitiesWithBooks' element={user.Role === 'Admin' ? <ActivitiesWithBooks /> : <PageNotFoundComponent /> } />
      <Route path='/archiveofbooksgiventostudents' element={user.Role === 'Admin' ? <ArchiveOfBooksGivenToStudentsComponent /> : <PageNotFoundComponent /> } />
      <Route path='/feedbackmessages' element={user.Role === 'Admin' ? <FeedbackMessagesComponent /> : <PageNotFoundComponent /> } />
      <Route path='/removedfeedbackmessages' element={user.Role === 'Admin' ? <RemovedFeedbackMessagesComponent /> : <PageNotFoundComponent /> } />
    </Routes>
  )
}

export default RouteComponent;