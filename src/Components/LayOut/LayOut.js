import React from 'react'
import Header from '../Header/Header'
function LayOut({children}) {
return (
    <div>
        {/* for use of our header in different places */}
        <Header/>
        {children}

    </div>
)
}

export default LayOut