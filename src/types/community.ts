export interface Review {
    id: number
    type: string
    title: string
    content: string
    author: string
    location: string
    date: string
    views: number
    likes: number
    comments: number
    image_url: string
    file_type: string // 'image' 또는 'video'
    file_path: string
    destination_id: number
    user_id: number

    user?: {
        profile_image: string
    }
}

export interface Comment {
    id: number
    body: string
    likes: number
    created_at: string

    review_id: number
    user_id: number
    parent_id: number

    replies?: Comment[]

    user?: {
        username: string
        profile_image: string
    }
}

type LikeType = 'review' | 'comment'
export interface Like {
    id: number
    user_id: number
    type: LikeType
    target_id: number
}

type NestedComment = Comment & {
    replies?: NestedComment[]
}
