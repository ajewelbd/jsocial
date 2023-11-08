import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import Comment from "../types/Comment";

export default function NewComment({id, commentId, updateComments, callback}: NewCommentProps) {
    console.log({id, commentId})
    const [newComment, setNewComment] = useState({
        comment: "",
        post_id: id,
        comment_id: commentId || null,
    })
    
    const [isSaving, setisSaving] = useState(false)
    
    const submitComment = () => {
        console.log(newComment)
        if (newComment.comment) {
            setisSaving(true)
            axios.post("comments", newComment).then(({ data }) => {
                updateComments(data)
                setNewComment({
                    comment: "",
                    post_id: id,
                    comment_id: commentId || null,
                })
                if (callback) callback(false)
            })
            .catch((e: unknown) => console.log(e))
            .finally(() => {
                setisSaving(false)
            })
        }
    }
    return (
        <div className="w-full">
            <div className="flex gap-x-3 border rounded items-center pr-3 pl-1 py-0.5">
                <input className="w-full h-7 text-xs focus:outline-none" placeholder={`Your ${commentId ? "reply" : "comment"}...`} onChange={({ target }) => setNewComment({ ...newComment, comment: target.value })} />
                {isSaving ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                )
                :
                (
                    <PaperAirplaneIcon className="w-4 h-4 cursor-pointer" onClick={submitComment} />
                )}
            </div>
        </div>
    )
}

export interface NewCommentProps {
    id: number;
    commentId?: number | null;
    updateComments: (comment: Comment) => void;
    callback?: (visibility: boolean) => void;
}
