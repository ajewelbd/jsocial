import User from "./User";

type Post = {
    id: number,
    user_id: number,
    details: string,
    created_at: string,
    updated_at: string,
    comments_count: number,
    user: User
}

export default Post;