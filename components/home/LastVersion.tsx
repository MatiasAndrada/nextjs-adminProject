import React from 'react'

const LastVersion = () => {
    const res = fetch('https://api.github.com/repos/matiasandrada/nextjs-adminProject/commits')

    return (
        <div>LastVersion</div>
    )
}

export default LastVersion