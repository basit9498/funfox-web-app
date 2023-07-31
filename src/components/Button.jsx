import React from 'react'

const Button = ({ className, text, onClick }) => {
    return (
        <>
            <button onClick={onClick} className={`${className} button`}>{text}</button>
        </>
    )
}

export default Button