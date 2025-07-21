import DestinationDetail from './DestinationDetail'
import { Suspense } from 'react'
type Props = {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]
}

export default async function DestinationPage({ params }: Props) {
    const { id } = await params
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DestinationDetail destinationId={id} />
        </Suspense>
    )
}
