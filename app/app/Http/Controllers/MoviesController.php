<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MoviesController extends Controller
{
    /**
     * Show a movie.
     */
    public function show(Request $request, String $slug): Response
    {   
        $movie = Movie::where('slug', $slug)
        ->with('reviews.user') // Load reviews along with the user who submitted them
        ->firstOrFail();

    // Determine if the authenticated user can add a review
    $canAddReview = $request->user() && !$movie->reviews->contains('user_id', $request->user()->id);


       
        return Inertia::render('Movies/Show', [
            'movie' => $movie,
            'canAddReview' => $canAddReview,
            'averageRating' => $movie->getAverageRatingAttribute(), 
        ]);
    }

}
