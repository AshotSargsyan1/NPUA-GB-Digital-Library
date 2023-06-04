import classes from './MapComponent.module.css'

function MapComponent() {

    return (
        <div className={classes.mapDiv}>

            <a href="https://yandex.ru/maps/10259/gyumri/?ll=43.847596%2C40.798147&utm_medium=mapframe&utm_source=maps&z=15.9" style={{
                color: '#eee',
                fontSize: '12px',
                position: 'absolute',
                top: '14px',
            }}>Гюмри — Яндекс Карты</a>
            <iframe className={classes.iframeForMap} src="https://yandex.ru/maps/-/CCUSzGbedC" height="600px" width = '100%' allowFullScreen="true" >
            </iframe>
        </div>
    )
}

export default MapComponent
