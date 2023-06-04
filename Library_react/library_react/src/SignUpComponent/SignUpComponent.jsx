import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import classes from './SignUpComponent.module.css'
import { TextField } from '@mui/material';
import { sendSignUpData } from '../Features/signInAndSignUpSlice'


function SignUpComponent() {

    const dispatch = useDispatch()

    const validationSchema = yup.object({
        firstName: yup.string().required('Գրեք Ձեր անունը'),
        lastName: yup.string().required('Գրեք Ձեր ազգանունը'),
        email: yup.string().required('Գրեք Ձեր էլեկտրոնային հասցեն').email('Գրեք էլեկտրոնային հասցեն ճիշտ ձևով'),
        password: yup.string().required('Գրեք Ձեր գաղտնաբառը'),
        confirmPassword: yup.string().required('Գրեք Ձեր գաղտնաբառը ևս մեկ անգամ').oneOf([yup.ref('password'), null]),
        group: yup.string().required('Գրեք Ձեր խումբը'),
        passport: yup.string().required('Գրեք Ձեր անձնագրի սերիան և համարը'),
        userQrCode: yup.string().required('Գրեք Ձեր քարտի QR-ի կոդը'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            group: '',
            passport: '',
            userQrCode: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(sendSignUpData(values))
            for (let i in values) {
                values[i] = ''
            }
            return (values)
        },
    });

    return (
        <div className={classes.formDiv}>

            <h1 className={classes.signupTitle}>Գրանցվել</h1>

            <div>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <div>
                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="firstName"
                            name="firstName"
                            placeholder="Անուն"
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />

                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="lastName"
                            name="lastName"
                            placeholder="Ազգանուն"
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />


                        <TextField
                            className={classes.inputs}
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
                            className={classes.inputs}
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

                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Կրկնեք գաղտնաբառը"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />

                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="group"
                            name="group"
                            placeholder="Խումբ"
                            type="text"
                            value={formik.values.group}
                            onChange={formik.handleChange}
                            error={formik.touched.group && Boolean(formik.errors.group)}
                            helperText={formik.touched.group && formik.errors.group}
                        />

                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="passport"
                            name="passport"
                            placeholder="Անձնագրի սերիա և համար"
                            type="text"
                            value={formik.values.passport}
                            onChange={formik.handleChange}
                            error={formik.touched.passport && Boolean(formik.errors.passport)}
                            helperText={formik.touched.passport && formik.errors.passport}
                        />

                        <TextField
                            className={classes.inputs}
                            fullWidth
                            id="userQrCode"
                            name="userQrCode"
                            placeholder="Qr կոդ"
                            type="text"
                            value={formik.values.userQrCode}
                            onChange={formik.handleChange}
                            error={formik.touched.userQrCode && Boolean(formik.errors.userQrCode)}
                            helperText={formik.touched.userQrCode && formik.errors.userQrCode}
                        />


                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <Button color="primary" variant="contained" size='large' sx={{
                            width: '30%'
                        }} className={classes.signupBtn} type="submit">
                            Գրանցվել
                        </Button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default SignUpComponent



