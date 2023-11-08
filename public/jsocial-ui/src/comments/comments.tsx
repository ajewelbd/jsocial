import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../types/Comment";
import { ArrowPathIcon, RectangleStackIcon } from "@heroicons/react/20/solid";
import { ScrollArea } from "../shadcn/components/ui/scroll-area";
import { timeFromNow } from "../helpers/message-time";
import NewComment from "./new-comment";
import ReplyCard from "./reply-card";
import Replies from "./replies";

export default function Comments({ id }: {id: number}) {
    const [comments, setComments] = useState<Array<Comment>>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`posts/${id}/comments`).then(({ data }) => {
            // console.log(prepareComments(data))
            setComments(data);
        }).catch((e: unknown) => {
            console.log(e)
        }).finally(() => setIsLoading(false))
    }, [])

    const updateComments = (comment: Comment) => {
        setComments([...comments, comment]);
    }

    const prepareComments = (comments: Comment[]) => {
        const _comments: Comment[] = [];
        comments.forEach(comment => {
            if (comment.comment_id) {
                const parent = _comments.find(_comment => _comment.id === comment.comment_id);
                parent && parent.replies?.push(comment)
            } else {
                _comments.push(comment)
            }
        })

        console.log(_comments)
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
                                <div className="flex gap-x-1 ml-6 mt-1 items-center">
                                    <Replies />
                                    <ReplyCard comment={comment} updateComments={updateComments}/>
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