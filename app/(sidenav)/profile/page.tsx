import React, { Suspense } from 'react'
import ProfileGrid from '@/components/profile/profile-grid'
import { lusitana } from '@/components/fonts'
import { ProfileSkeleton } from '@/components/skeletons'
import { skeletonDelay } from '@/lib/skeleton-delay'

// Componente para el perfil
async function ProfileContent() {
    // Delay configurable para testing de skeletons (controlado por env var)
    await skeletonDelay();
    
    return <ProfileGrid />;
}

export default function Page() {
    return (
        <main className='space-y-4'>
            <h1 className={`${lusitana.className} text-4xl`}>Profile page</h1>
            
            <Suspense fallback={<ProfileSkeleton />}>
                <ProfileContent />
            </Suspense>
        </main>
    )
}