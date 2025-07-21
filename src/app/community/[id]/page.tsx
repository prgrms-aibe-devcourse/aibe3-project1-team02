import CommunityDetail from './CommunityDetail'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]
}

export default async function CommunityPostPage({ params }: Props) {
    const { id } = await params
    return <CommunityDetail postId={id} />
}
