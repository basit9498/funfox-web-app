import React from 'react'

const ModalBox = ({ children, className, open }) => {
    return (
        <>
            <main className={`${open ? 'modal__open' : 'modal__close'} modalBox__main`}>
                <section className={className}>{children}</section>
            </main>
        </>
    )
}

export default ModalBox