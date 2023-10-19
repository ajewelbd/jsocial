<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $has_reply = rand(0, 5);

        $comment_id = null;

        // "user_id" => rand(1, 100010),
        // "post_id" => rand(1, 110510),

        if(in_array($has_reply, [1, 3, 5])) {
            $comment_id = \App\Models\Comment::all()->random()->id;
        }

        return [
            "comment" => fake()->text(),
            "user_id" => \App\Models\User::all()->random()->id,
            "post_id" => \App\Models\Post::all()->random()->id,
            "comment_id" => $comment_id
        ];
    }
}
