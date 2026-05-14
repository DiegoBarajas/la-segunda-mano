import React from 'react'
import Confetti from 'react-confetti'
import premiumSvg from '../Assets/Icons/premium.svg'

import '../Styles/Fragments/ModalPremiumSuccess.css'

const ModalPremiumSuccess = () => {

    return (
        <div className='premium-success-container'>

            <Confetti
                recycle={false}
                numberOfPieces={250}
            />

            <div className='premium-success-card'>

                <div className='premium-success-glow'></div>

                <div className='premium-logo-badge'>
                    <img
                        src={premiumSvg}
                        alt='Premium'
                        className='premium-success-icon'
                    />

                    <span className='premium-success-badge'>
                        PREMIUM ACTIVADO
                    </span>
                </div>

                <h2>
                    ¡Tu anuncio ahora es Premium!
                </h2>

                <p>
                    Tu anuncio
                    ahora tendrá mayor visibilidad y prioridad
                    dentro de la plataforma.
                </p>

                <div className='premium-benefits-list'>

                    <div className='premium-benefit'>
                        Prioridad en búsquedas
                    </div>

                    <div className='premium-benefit'>
                        Aparece en página principal
                    </div>

                    <div className='premium-benefit'>
                        Más compradores verán tu anuncio
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ModalPremiumSuccess