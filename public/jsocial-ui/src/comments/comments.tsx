import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../types/Comment";
import { ArrowPathIcon, RectangleStackIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ScrollArea } from "../shadcn/components/ui/scroll-area";
import { timeFromNow } from "../helpers/message-time";
import NewComment from "./new-comment";

export default function Comments({ id }: {id: number}) {
    const [comments, setComments] = useState<Array<Comment>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isCommentSaving, setIsCommentSaving] = useState(false)

    const [newComment, setNewComment] = useState({
        comment: "",
        post_id: id
    })

    useEffect(() => {
        setIsLoading(true)
        axios.get(`posts/${id}/comments`).then(({ data }) => {
            console.log(data)
            setComments(data);
        }).catch((e: unknown) => {
            console.log(e)
        }).finally(() => setIsLoading(false))
    }, [])

    const submitComment = () => {
        console.log(newComment)
        if (newComment.comment) {
            setIsCommentSaving(true)
            axios.post("comments", newComment).then(({ data }) => {
                setComments([...comments, data]);
            })
            .catch((e: unknown) => console.log(e))
            .finally(() => {
                setIsCommentSaving(false)
            })
        }
    }

    const updateComments = (comment: Comment) => {
        setComments([...comments, comment]);
    }

    return (
        <>
            {isLoading && (
                <div className="grid place-items-center">
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                </div>
            )}
            <div className="flex gap-y-1">
                <div className="flex flex-col gap-y-1.5 w-full mt-1">
                    {(!comments.length && !isLoading) && (
                        <div className="">
                            <p className="text-xs text-justify text-gray-700">No Comments yet!</p>
                        </div>
                    )}
                    <ScrollArea className="max-h-64">
                        {comments.map((comment: Comment) => (
                            <div key={comment.id} className="flex flex-col gap-y-2 p-1.5 border rounded bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex gap-x-1 justify-center items-center">
                                        <RectangleStackIcon className="w-5 h-5 text-gray-500" />
                                        <p className="text-sm font-medium text-gray-600">{comment.user.first_name} {comment.user.last_name}</p>
                                        {comment.created_at && (<p className="text-xs italic">{timeFromNow(comment.created_at as string)} ago</p>)}
                                    </div>
                                </div>
                                <p className="ml-6 text-xs text-justify text-gray-700">{comment.comment}</p>
                                <div className="ml-6 p-0.5 flex gap-x-1 mt-1 rounded bg-gray-200 max-w-fit cursor-pointer">
                                    <ChatBubbleBottomCenterIcon className="w-4 h-4"/>
                                    <p className="text-xs text-justify text-gray-700">Reply</p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <NewComment id={id} updateComments={updateComments}/>
                </div>
            </div>
        </>
    );
}