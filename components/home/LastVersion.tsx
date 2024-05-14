import React from 'react'

async function LastVersion() {
    const response = await fetch('https://api.github.com/repos/matiasandrada/nextjs-adminProject/commits').then(res => res.json()).catch(err => console.error(err))
    const lastCommitAuthor = response[0]?.commit.author.name
    console.log("🦇  LastVersion  lastCommitAuthor:", lastCommitAuthor)
    const lastCommitDate = response[0]?.commit.author.date
    console.log("🦇  LastVersion  lastCommitDate:", lastCommitDate)
    const transformDate = new Date(lastCommitDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
    if (!response) return <div>loading...</div>
    if (!lastCommitAuthor && lastCommitDate === undefined) {
        const resMessage = response.message
        const extractIP = resMessage?.split(' ')[5]
        return (
            <div className='text-gray-500 text-sm opacity-60'>
                <h4 className='w-36 text-balance'>Exceded IP limit request in API github</h4>
                <p>IP: {extractIP}</p>
            </div>
        )
    }
    return (
        <div className='text-gray-500 text-sm opacity-60'>
            <h4>Ultima actualización</h4>
            <p>Autor: {lastCommitAuthor}</p>
            <p>Fecha: {transformDate}</p>
        </div>
    )
}

export default LastVersion