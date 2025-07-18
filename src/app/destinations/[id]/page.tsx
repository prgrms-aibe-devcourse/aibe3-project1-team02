
import DestinationDetail from './DestinationDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default async function DestinationPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;

  return <DestinationDetail destinationId={awaitedParams.id} />;
}
