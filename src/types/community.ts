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

    user?: {
        username: string
        profile_image: string
    }
}
