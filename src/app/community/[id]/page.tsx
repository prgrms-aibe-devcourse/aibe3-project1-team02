
import CommunityDetail from './CommunityDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function CommunityPostPage({ params }: { params: { id: string } }) {
  return <CommunityDetail postId={params.id} />;
}
