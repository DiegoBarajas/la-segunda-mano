import React from 'react'
import ContentLayout from '../Layouts/ContentLayout'
import Button from '../Components/Button'

import addSvg from '../Assets/Icons/add.svg'
import AccordionContentLayout from '../Layouts/AccordionContentLayout'

const ManageBanners = () => {
    return (
        <AccordionContentLayout complete titulo="Administrar Banners">
            <Button horizontal icon={addSvg}>Agregar banner</Button>
        </AccordionContentLayout>
    )
}

export default ManageBanners