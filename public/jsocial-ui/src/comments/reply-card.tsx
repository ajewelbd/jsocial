import { ChatBubbleBottomCenterIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NewComment from "./new-comment";
import Comment from "../types/Comment";

export default function ReplyCard({comment, updateComments}: {comment: Comment, updateComments: (comment: Comment) => void}) {
    const [isReplyCardVisbile, setIsReplyCardVisbile] = useState(false)
    const replyCardVisibility = () => {
        setIsReplyCardVisbile(!isReplyCardVisbile);
    }
    return (
        <>
            <div className={`${isReplyCardVisbile ? "hidden " : ""}p-0.5 flex gap-x-1 bg-gray-200 max-w-fit cursor-pointer rounded`} onClick={replyCardVisibility}>
                <ChatBubbleBottomCenterIcon className="w-4 h-4" />
                <p className="text-xs text-justify text-gray-700">Reply</p>
            </div>
            <div className={`${isReplyCardVisbile ? "" : "hidden "}flex ml-6`}>
                <button className="border px-1" onClick={replyCardVisibility}><XCircleIcon className="w-4 h-4"/></button>
                <NewComment id={comment.id} updateComments={updateComments} callback={setIsReplyCardVisbile} commentId={comment.comment_id}/>
            </div>
        </>
    )
}