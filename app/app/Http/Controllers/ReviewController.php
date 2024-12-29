<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Review;

class ReviewController extends Controller
{
   
    public function store(Request $request, $movieId)
    {
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'review' => 'required|string|max:1000',
        ]);

        $movie = Movie::findOrFail($movieId);

        // Check if the user already reviewed this movie
        if ($movie->reviews()->where('user_id', auth()->id())->exists()) {
            return redirect()->route('movies.show', $movie->slug)
                 ->with('error', 'You have already reviewed this movie.');
        }

        $movie->reviews()->create([
            'user_id' => auth()->id(),
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return redirect()->route('movies.show', $movie->slug)
             ->with('success', 'Review added successfully.');
    }
}


