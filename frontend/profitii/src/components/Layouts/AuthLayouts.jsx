import React from 'react'

const AuthLayouts = ({ children }) => {
    return (
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            {children}
        </div>
    )
}

export default AuthLayouts