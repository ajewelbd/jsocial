import { FormEvent, useEffect, useState } from "react"
import Post from "../types/Post";
import axios from "axios";
import { MapPinIcon, PaperClipIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Textarea,
  } from "@material-tailwind/react";
import Comments from "../comments/comments";

export default function MainContent() {
    const [newPost, setPost] = useState({
        details: ""
    })
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [newPostModalVisibility, setNewPostModalVisibility] = useState(false);

    const handleNewPostModalVisibility = () => setNewPostModalVisibility(current => !current);

    const handleScrollEnd = ({ target }: any) => {
        if ((target["scrollHeight"] - target["scrollTop"]) - 150 === (target["clientHeight"] - 150)) {
            axios.get(`posts?page=${currentPage + 1}`).then(({ data }) => {
                const newPosts = data.data!.map((post: Post) => ({ ...post, splitted_details: splitText(post.details) }));
                console.log(posts, currentPage)
                setPosts([...posts, ...newPosts])
                setCurrentPage(currentPage + 1)
            })
        }
    }

    const sharePost = (e: FormEvent) => {
        e.preventDefault();
        console.log(newPost)
        axios.post("posts", newPost)
            .then(({ data }) => {
                setPosts([data, ...posts])
                setNewPostModalVisibility(false)
            }).catch((e: unknown) => {
                console.log(e)
            })
    }

    useEffect(() => {
        axios.get("posts").then(({ data }) => {
            setPosts(data.data!.map((post: Post) => ({ ...post, splitted_details: splitText(post.details) })))
        })

        // const postContainer = document.querySelector<HTMLElement>("#posts");
        // postContainer?.addEventListener("scrollend", handleScrollEnd);
        // return postContainer?.removeEventListener("scroll", handleScrollEnd)
    }, [])

    const [postIds, setPostIds] = useState<any>({})
    const toggleComments = (id: number) => {
        console.log(id)
        setPostIds({ ...postIds, [id]: postIds[id] ? false : true })
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="flex flex-col gap-5 dark:border-gray-700 mt-11">
                    <div className="flex">

                        <div className="flex py-1">
                            {/* <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => setNewPostModalVisibility(true)}>
                                New Post
                            </button> */}
                            <Button onClick={handleNewPostModalVisibility}>New Post</Button>
                        </div>

                    </div>
                    <div className="flex">
                        <section className="flex flex-row flex-wrap mx-auto overflow-y-auto no-scrollbar" style={{ height: "calc(100vh - 150px)" }} id="posts" onScroll={handleScrollEnd}>

                            {posts.map(post => (
                                <div
                                    className="transition-all duration-150 flex w-full px-4 py-3"
                                    key={post.id}
                                >
                                    <div
                                        className="flex flex-col items-stretch min-w-full min-h-full mb-3 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
                                    >
                                        <section className="px-4 py-2 mt-2">
                                            <div className="flex items-center flex-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                                </svg>

                                                <div className="flex flex-col mx-2">
                                                    <a href="" className="font-semibold text-gray-700 hover:underline">
                                                        {post.user.first_name} {post.user.last_name}
                                                    </a>
                                                    <span className="mx-1 text-xs text-gray-600">{post.created_at.split("T")[0]}</span>
                                                </div>
                                            </div>
                                        </section>
                                        <hr className="border-gray-300" />
                                        {/* <div className="md:flex-shrink-0">
                                        <img
                                            src="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png"
                                            alt="Blog Cover"
                                            className="object-fill w-full md:h-56"
                                        />
                                    </div> */}
                                        <p
                                            className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700"
                                        >
                                            {/* {readMore(post.splitted_details)} */}
                                            {post.details}
                                        </p>
                                        <div className="px-4 py-2 overflow-hidden">
                                            <div className="flex flex-row items-center">
                                                <div
                                                    className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        ></path>
                                                    </svg>
                                                    <span>1.5k</span>
                                                </div>

                                                <div
                                                    className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2 cursor-pointer"
                                                    onClick={() => toggleComments(post.id)}
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                        ></path>
                                                    </svg>
                                                    <span>{String(post.comments_count)}</span>
                                                </div>

                                                <div
                                                    className="text-xs font-medium text-gray-500 flex flex-row items-center"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                                        ></path>
                                                    </svg>
                                                    <span>7</span>
                                                </div>
                                            </div>
                                            {postIds[post.id] && (
                                                <div className="mt-1" >
                                                    <hr className="border-gray-300" />
                                                    <Comments id={post.id} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>

                <div id="authentication-modal" tabIndex={1} aria-hidden="true" className={`${newPostModalVisibility ? "absolute" : "hidden"} grid place-items-center top-5 left-3 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-1 right-0.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => setNewPostModalVisibility(false)}>
                                <XMarkIcon className="w-6 h-6" />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">

                                <form onSubmit={sharePost}>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="comment" className="sr-only">Your comment</label>
                                            <textarea id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your thoughts..." onChange={({ target }) => setPost({ ...newPost, details: target.value })} required></textarea>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Share
                                            </button>
                                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <PaperClipIcon className="w-4 h-4" />
                                                    <span className="sr-only">Attach file</span>
                                                </button>
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <MapPinIcon className="w-4 h-4" />
                                                    <span className="sr-only">Set location</span>
                                                </button>
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <PhotoIcon className="w-4 h-4" />
                                                    <span className="sr-only">Upload image</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                size="xs"
                open={newPostModalVisibility}
                handler={handleNewPostModalVisibility}
                className="bg-transparent shadow-none"
            >
                <form onSubmit={sharePost}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                New Post
                            </Typography>
                            <Textarea variant="standard" placeholder="Your thoughts..." onChange={({ target }) => setPost({ ...newPost, details: target.value })} />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" variant="gradient" onClick={handleNewPostModalVisibility} fullWidth>
                                Share
                            </Button>
                            <p className="ml-auto mt-1 text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    )
}

function splitText(text: string) {
    return [text.slice(0, 300), text.slice(300)];
}

function readMore(text: string) {
    return (
        <div className="">
            <span>{text[0]}{text[1] ? "..." : ""}</span>
            <button type="button" className="px-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">more</button>
        </div>
    )
}