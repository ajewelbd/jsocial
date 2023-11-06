type Comment = {
    id: number,
    comment: string,
    user_id: number,
    post_id: number,
    comment_id: number | null,
    created_at: string | null,
    updated_at: string | null
}

export default Comment;