import React from 'react'
import CrossIcon from '../../assets/images/cross.svg'

const ModalHeader = ({ text, onClick }) => {
    return (
        <>
            <div className='modal__header'>
                <h4>{text}</h4>
                <img onClick={onClick} src={CrossIcon} role='button' />
            </div>
        </>
    )
}

export default ModalHeader