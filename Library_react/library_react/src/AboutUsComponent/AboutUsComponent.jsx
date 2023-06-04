import classes from './AboutUsComponent.module.css'

import MapComponent from '../MapComponent/MapComponent'

function AboutUsComponent() {
  return (
      <div className={classes.aboutUs}>
        <h1 className={classes.aboutUsTitle}>Մեր մասին</h1>
        <p className={classes.aboutUsParagraph}><b>ՀԱՊՀ ԳՄ գրադարան</b> - Հայաստանի ազգային պոլիտեխնիկական համալսարանի Գյումրու մասնաճյուղի գրադարանն է։
          ՀԱՊՀ ԳՄ գրադարանում հնարավոր է տեղեկություն ստանալ համալսարանի գրադարանի գրքերի մասին։ Հնարավոր է գտնել գրքերը որոնման համակարգով, ինչպես նաև ենթաբաժիններով։</p>
        <p className={classes.aboutUsParagraph}>Գրադարանը պարունակում է ակտուալ հրատարակություններ, որոնք ընտրված են մասնագետների կողմից, և մեծ պահանջարկ ունեն դասախոսների և ուսանողների շրջանում։</p>
        <MapComponent />
      </div>
  )
}

export default AboutUsComponent