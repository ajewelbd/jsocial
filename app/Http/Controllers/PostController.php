<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::withCount("comments")
            ->with("user")
            ->orderByDesc("id")
            ->paginate(5);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = new Post();
        $user = Auth::user();
        $post->details = $request->details;
        $post->user_id = $user->id;
        $post->save();

        $post->user = $user;
        $post->comments_count = 0;

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return 1;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    /**
     * Get the specified resource from storage.
     */
    public function comments(String $post_id, String $comment_id)
    {
        $condition_value = $comment_id == 0 ? null : $comment_id;

        return Comment::where("comment_id", "=", $condition_value)
            ->with("user")
            ->withCount("replies")
            ->where("post_id", "=", $post_id)
            ->get();
    }
}
