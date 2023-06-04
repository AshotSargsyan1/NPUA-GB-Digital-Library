import { useDispatch, useSelector } from 'react-redux'
import { profileMess } from '../Features/profileSlice'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import classes from './ProfileComponent.module.css'

function ProfileComponent() {


    const navigate = useNavigate()
    const profileData = useSelector(profileMess)

    return (
        <>
            <Card className={classes.card} >
                <CardContent sx={{ padding: 0 }}>
                    <Box className={classes.profileHeader} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography className={classes.profileTitle}>
                            Իմ Պրոֆիլը
                        </Typography>
                        <Avatar sx={{
                            bgcolor: deepPurple[500],
                        }}
                            className={classes.avatarIcon}
                        />
                        <div className={classes.profileInfo} style={{
                            display: 'flex',
                        }}>
                            <p className={classes.name}>{profileData.firstName}</p>
                            <p className={classes.name}>{profileData.lastName}</p>
                        </div>
                        <div className={classes.profileEmail}>
                            <p className={classes.group}>{profileData.group}</p>
                            {profileData.email}
                        </div>


                    </Box>
                    <Box className={classes.operations} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography className={classes.operationsBtns} variant='body2'>

                            <Box className={classes.btns} onClick={() => {
                                navigate('/favoritebooks')
                            }}><BookmarksIcon className={classes.btnSize} /> <p className={classes.operationsNames}>Ընտրված գրքեր</p>
                            </Box>

                        </Typography>
                        {profileData.Role === 'Admin' &&
                            <Typography className={classes.operationsBtns} variant='body2'>

                                <Box className={classes.btns} onClick={() => {
                                    navigate('/crud')
                                }}><AdminPanelSettingsIcon className={classes.btnSize} /> <p className={classes.operationsNames}>Կարգավորումներ</p>
                                </Box>

                            </Typography>}
                        <Typography className={classes.btns} variant='body2' onClick={() => {
                            localStorage.removeItem('accessToken');
                            window.location.reload()
                        }}>
                            <Logout size='small' className={classes.btnSize} /><p className={classes.operationsNames}>Դուրս գալ</p>
                        </Typography>
                    </Box>
                </CardContent>
            </Card >
        </>
    )
}

export default ProfileComponent
