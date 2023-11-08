import { useState } from "react";
import Comment from "../types/Comment";
import Comments from "./comments";

export default function Replies({ comment }: {comment: Comment}) {
    const total = comment.replies_count as number;

    const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="w-full">
        {isClicked ?
        (<Comments id={comment.post_id} commentId={comment.id}/>)
        :
        (<button className="text-xs text-justify text-blue-500 hover:underline" onClick={() => setIsClicked(true)}>{total} {total > 1 ? "replies" : "reply"}</button>)
    }
    </div>
  )
}