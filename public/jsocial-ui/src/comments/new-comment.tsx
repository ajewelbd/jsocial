import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import Comment from "../types/Comment";

export default function NewComment({id, updateComments}: {id: number, updateComments: (comment: Comment) => void}) {
    const [newComment, setNewComment] = useState({
        comment: "",
        post_id: id
    })
    
    const [isCommentSaving, setIsCommentSaving] = useState(false)
    
    const submitComment = () => {
        console.log(newComment)
        if (newComment.comment) {
            setIsCommentSaving(true)
            axios.post("comments", newComment).then(({ data }) => {
                // setComments([...comments, data]);
                updateComments(data)
                setNewComment({
                    comment: "",
                    post_id: id
                })
            })
            .catch((e: unknown) => console.log(e))
            .finally(() => {
                setIsCommentSaving(false)
            })
        }
    }
    return (
        <div className="w-full">
            <div className="flex gap-x-3 border rounded items-center pr-3 pl-1 py-0.5">
                <input className="w-full h-7 text-xs focus:outline-none" placeholder="Your comment..." onChange={({ target }) => setNewComment({ ...newComment, comment: target.value })} />
                {isCommentSaving ? (
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