import React from 'react'

const Logo = ({ className='', white=false, simple=false, onClick }) => {
  return (
    <svg className={className} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <text
            style={{
                fill: 'rgb(26, 188, 156)',
                fontFamily: 'Lexend Deca',
                fontSize: '75px',
                fontWeight: 700,
                whiteSpace: 'pre'
            }}
            x="66.042"
            y="193.043"
            transform="matrix(1, 0, 0, 1, -2.842170943040401e-14, 0)"
        >La</text>

        <text
            style={{
                fill: 'rgb(26, 188, 156)',
                fontFamily: 'Lexend Deca',
                fontSize: '110px',
                fontWeight: 700,
                whiteSpace: 'pre'
            }}
            x="183.976"
            y="341.849"
            transform="matrix(1, 0, 0, 1, -2.842170943040401e-14, 0)"
        >Mano</text>

        <text
            style={{
                fill: white ? 'white' : 'rgb(44, 62, 80)',
                fontFamily: 'Lexend Deca',
                fontSize: '95px',
                fontWeight: 700,
                whiteSpace: 'pre'
            }}
            x="8.576"
            y="255.11"
            transform="matrix(1, 0, 0, 1, -2.842170943040401e-14, 0)"
        >Segunda</text>

        {
            !simple 
            ? <text
                style={{
                    fill: 'rgb(255, 94, 88)',
                    fontFamily: 'Lexend Deca',
                    fontSize: '50px',
                    fontWeight: 700,
                    whiteSpace: 'pre'
                }}
                x="279.561"
                y="375.113"
                transform="matrix(1, 0, 0, 1, -2.842170943040401e-14, 0)"
            >.com.mx</text> 
            : <></>
        }
        
    </svg>
  )
}

export default Logo