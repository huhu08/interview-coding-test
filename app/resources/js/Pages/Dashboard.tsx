import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Movie, PageProps } from '@/types';
import { Head, Link,useForm } from '@inertiajs/react';

export default function Dashboard({
    movies,
    canAddReview,
}: PageProps<{ movies: Movie[], canAddReview: boolean}>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <ul className="p-6">
                            {movies.map(movie => (
                                <Link
                                    href={`/movies/${movie.slug}`}
                                    as="li"
                                    className="cursor-pointer p-2 rounded-md hover:bg-sky-100"
                                >
                                    <h2 className="font-bold">{movie.title}</h2>
                                    <p>{movie.description}</p>
                                    
                                  </Link>
                            
                               

                            ))}
                        </ul>
                        
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
