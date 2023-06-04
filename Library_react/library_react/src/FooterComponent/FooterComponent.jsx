import { Link } from 'react-router-dom'

import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import npuaGm from '../assets/npuaGm.png'
import classes from './FooterComponent.module.css'

function FooterComponent() {

  function socialNetworkingService(socialNetworkingServiceUrl, imageUrl) {
    return <a target='_blank' href={socialNetworkingServiceUrl}>
      <img src={imageUrl} alt="no image" />
    </a>
  }

  return (
    <footer className={classes.mainDiv}>

      <div className={classes.logoDiv}>
        <h2>Մենք`</h2>
        {socialNetworkingService('https://npuagb.am/hy/', npuaGm)}
        {socialNetworkingService('https://www.secure.instagram.com/polytechgyumri/?hl=om-et', instagram)}
        {socialNetworkingService('https://www.facebook.com/polytechgyumri/', facebook)}
      </div>

      <Link className={classes.focus} to={'/feedback'}>Հետադարձ կապ</Link>

      <Link className={classes.focus} to={'/aboutUs'}>Մեր մասին</Link>

    </footer>
  )
}

export default FooterComponent