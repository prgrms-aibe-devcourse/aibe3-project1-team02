import DestinationDetail from './DestinationDetail'

export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]
}

export default function DestinationPage({ params }: { params: { id: string } }) {
    return <DestinationDetail destinationId={params.id} />
}
