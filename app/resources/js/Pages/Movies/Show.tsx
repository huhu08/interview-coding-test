import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Movie, PageProps ,Review} from '@/types';
import { Head,useForm } from '@inertiajs/react';

export default function Dashboard({
    movie,canAddReview
}: PageProps<{ movie: Movie ,averageRating: number,canAddReview: boolean}>) {
    const { data, setData, post, reset, errors } = useForm({
        rating: '',
        review: '',
    });
    
    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/movies/${movie.id}/reviews`, {
            onSuccess: () => {
                reset(); // Reset the form if successful
                alert('Review submitted successfully!');
            },
            onError: (errors) => {
                console.error('Error submitting review:', errors);
                alert('Failed to submit review. Please check your input.');
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {movie.title}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                      <p>{movie.description}</p>
                      <div className="mt-4">
                        <h3 className="font-semibold">Average Rating: {averageRating} / 5</h3>
                      </div>
                      <h3 className="mt-6 text-lg font-medium">Reviews:</h3>
                        <ul className="mb-4">
                            {movie.reviews.length > 0 ? (
                                movie.reviews.map((review) => (
                                    <li key={review.id} className="mb-2">
                                        <p>
                                            <strong>{review.user.name}:</strong>{' '}
                                            {review.comment}
                                        </p>
                                        <p>Rating: {review.rating} / 5</p>
                                    </li>
                                ))
                            ) : (
                                <p>No reviews yet. Be the first to review!</p>
                            )}
                        </ul>

                        {canAddReview && (
                            <form onSubmit={submitReview}>
                                <div className="mb-4">
                                    <label htmlFor="rating" className="block mb-2">
                                        Rating:
                                    </label>
                                    <select
                                        id="rating"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        className="border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                                        required
                                    >
                                        <option value="">Select a rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    {errors.rating && (
                                        <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block mb-2">
                                        Comment:
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={data.review}
                                        onChange={(e) => setData('review', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                                        required
                                    />
                                    {errors.review && (
                                        <p className="mt-1 text-sm text-red-600">{errors.review}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}  



                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
