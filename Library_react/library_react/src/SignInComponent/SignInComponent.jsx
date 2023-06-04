import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'

import classes from './SignInComponent.module.css'
import { sendSignInData } from '../Features/signInAndSignUpSlice'

function SignInComponent() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().required('Գրեք Ձեր էլեկտրոնային հասցեն').email('Գրեք էլեկտրոնային հասցեն ճիշտ ձևով'),
    password: yup.string().required('Գրեք Ձեր գաղտնաբառը')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(sendSignInData(values))
      for (let i in values) {
        values[i] = ''
      }
      return (values)
    },
  });

  return (
    <div className={classes.formDiv}>

      <h1 className={classes.signinTitle}>Մուտք գործել</h1>

      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.emailInput}
          sx={{ mb: '5%' }}
          fullWidth
          id="email"
          name="email"
          placeholder="Էլեկտրոնային հասցե"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className={classes.passwordInput}
          sx={{ mb: '10%' }}
          fullWidth
          id="password"
          name="password"
          placeholder="Գաղտնաբառ"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: '5%'
        }}>
          <Button color="primary" variant="contained" size='large' type="submit" className={classes.signinBtn} sx={{
            margin: '0 auto',
            width: '50%'
          }}>
            Մուտք
          </Button>
        </div>

      </form>


      <Button size="small" className = {classes.signupBtn} onClick={() => {
        navigate('/signup')
      }} >Գրանցվել</Button>
    </div >
  )
}

export default SignInComponent


