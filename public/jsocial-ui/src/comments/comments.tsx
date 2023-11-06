import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../types/Comment";

export default function Comments({ id }: {id: number}) {
    const [comments, setComments] = useState<Array<Comment>>([])
    useEffect(() => {
        axios.get(`posts/${id}/comments`).then(({ data }) => {
            console.log(data)
            setComments(data);
        }).catch((e: unknown) => {
            console.log(e)
        })
    }, [])
    return (
        <div className="flex gap-y-1">
            <div className="flex flex-col">
                {!comments.length && (<p>No Comments yet!</p>)}
                {comments.map((comment: Comment) => (
                    <div key={comment.id}>
                        <p className="text-xs text-justify text-gray-700">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}