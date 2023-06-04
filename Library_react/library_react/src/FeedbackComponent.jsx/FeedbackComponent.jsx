import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'

import classes from './FeedbackComponent.module.css'
import { isLogged } from '../utils';
import { profileMess, sendFeedbackMessage } from '../Features/profileSlice';

function FeedbackComponent() {
  const profileData = useSelector(profileMess)
  const dispatch = useDispatch()
  function alertMessage() {
    alert('Մենք շուտով կպատասխանենք Ձեզ անձնական նամակով')
  }

  const validationSchema = yup.object({
    theme: yup.string().required('Գրեք հարցի թեման'),
    text: yup.string().required('Գրեք հաղորդագրությունը')
  });

  const formik = useFormik({
    initialValues: {
      theme: '',
      text: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alertMessage()
      dispatch(sendFeedbackMessage({ values, profileData }))
      for (let i in values) {
        values[i] = ''
      }
      return (values)
    },
  });

  return (

    <div className={classes.formDiv}>
      {isLogged ?
        <>
          <h2 className={classes.feedbackTitle}>Հետադարձ կապ</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className={classes.feedBackForm}>
              <TextField
                fullWidth
                id="theme"
                name="theme"
                label="Թեմա"
                type="text"
                value={formik.values.theme}
                onChange={formik.handleChange}
                error={formik.touched.theme && Boolean(formik.errors.theme)}
                helperText={formik.touched.theme && formik.errors.theme}
              />

              <TextField
                rows={5}
                fullWidth
                multiline
                id="text"
                name="text"
                label="Հաղորդագրություն"
                type="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
              />
              <Button className={classes.sendFeedbackMessageBtn} color="primary" variant="contained" size='large' type="submit">
                Ուղարկել
              </Button>
            </div>
          </form>

        </> : <h2 className={classes.feedbackTitle}>Գրանցվեք հետադարձ կապ ապահովելու համար</h2>
      }

    </div >
  )
}

export default FeedbackComponent


