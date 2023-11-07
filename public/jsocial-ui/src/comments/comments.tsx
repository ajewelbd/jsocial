import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../types/Comment";
import { ArrowPathIcon, RectangleStackIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";

export default function Comments({ id }: {id: number}) {
    const [comments, setComments] = useState<Array<Comment>>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        axios.get(`posts/${id}/comments`).then(({ data }) => {
            console.log(data)
            setComments(data);
        }).catch((e: unknown) => {
            console.log(e)
        }).finally(() => setIsLoading(false))
    }, [])
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
                    {comments.map((comment: Comment) => (
                        <div key={comment.id} className="flex flex-col gap-y-2 p-1.5 border rounded bg-gray-50">
                            <div className="flex justify-between">
                                <div className="flex gap-x-1">
                                    <RectangleStackIcon className="w-5 h-5 text-gray-500" />
                                    <p className="text-sm font-medium text-gray-600">{comment.user.first_name} {comment.user.last_name}</p>
                                </div>
                            </div>
                            <p className="ml-6 text-xs text-justify text-gray-700">{comment.comment}</p>
                            <div className="ml-6 p-0.5 flex gap-x-1 mt-1 rounded bg-gray-200 max-w-fit cursor-pointer">
                                <ChatBubbleBottomCenterIcon className="w-4 h-4"/>
                                <p className="text-xs text-justify text-gray-700">Reply</p>
                            </div>
                        </div>
                    ))}
                    <div className="w-72">
                        <Input label="reply" crossOrigin={true} icon={<PaperAirplaneIcon className="w-4 h-4" />} />
                    </div>
                </div>
            </div>
        </>
    );
}