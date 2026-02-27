import axios from 'axios';
import React, { useEffect, useState } from 'react'
import backend from '../backend';
import modals from '../Modals';
import CardAnnoucement from './CardAnnoucement';
import AnnoucementMyAnn from './AnnoucementMyAnn';
import { Link, useLocation } from 'react-router-dom';
import ColumnLayout from '../Layouts/ColumnLayout';

const RecentAnnouncements = () => {

    const location = useLocation()

    const [announcements, setAnnouncements] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // Scroll al top cuando cambia búsqueda
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        // Reset cuando cambia la búsqueda
        setAnnouncements([])
        setPage(0)
        setHasMore(true)

    }, [location.search])

    // Obtener anuncios
    useEffect(() => {

        const getAnnucements = async () => {
            if (!hasMore || loading) return

            setLoading(true)

            try {
                const searchParams = new URLSearchParams(location.search)
                searchParams.set('page', page)

                const response = await axios.get(
                    `${backend}/api/announcement/?${searchParams.toString()}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    }
                )

                const newAnnouncements = response.data.annoucements || []

                setAnnouncements(prev => {
                    if (page === 0) {
                        return newAnnouncements;
                    }

                    const combined = [...prev, ...newAnnouncements];

                    // Eliminar duplicados por _id
                    const unique = combined.filter((item, index, self) =>
                        index === self.findIndex(t => t._id === item._id)
                    );

                    return unique;
                });

                // Si vienen menos de 14 ya no hay más
                if (newAnnouncements.length < 14) {
                    setHasMore(false)
                }

            } catch (err) {

                if (err.response) {
                    modals.alert(
                        "Ups",
                        `${err.response.data}`,
                        'error',
                        'Volver al inicio'
                    ).then((answer) => {
                        if (answer.isConfirmed) {
                            window.location.href = '/'
                        }
                    })
                } else {
                    modals.alert(
                        "Ha ocurrido un error",
                        "No se recibió respuesta del servidor",
                        'error'
                    )
                }
            }

            setLoading(false)
        }

        getAnnucements()

    }, [page, location.search])

    // Detectar scroll
    useEffect(() => {
        const handleScroll = () => {

            if (
                window.innerHeight + document.documentElement.scrollTop + 200 >=
                document.documentElement.scrollHeight &&
                !loading &&
                hasMore
            ) {
                setPage(prev => prev + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [loading, hasMore])

    return (
        <ColumnLayout className='premium-container'>

            <section className='premium-content'>
                {announcements.map((ann, index) => (
                    <CardAnnoucement
                        key={ann.id || index}
                        showLabel={ann.showLabel}
                        ann={ann}
                    />
                ))}
            </section>

            {!loading && announcements.length === 0 && (
                <p style={{ marginTop: '50px' }}>
                    No se encontraron coincidencias.
                </p>
            )}

            {loading && (
                <p style={{ textAlign: 'center', margin: '30px 0' }}>
                    Cargando...
                </p>
            )}

            {!hasMore && announcements.length > 0 && (
                <p style={{ textAlign: 'center', margin: '30px 0' }}>
                    No hay más resultados
                </p>
            )}

        </ColumnLayout>
    )
}

export default RecentAnnouncements