import React from 'react';
import { reviews } from '../../../DummyData/review/systemReview'
export interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
}

const UserReviews: React.FC = () => {
  return (
    <section className="bg-gray-90 m-7 border border-gray-300 rounded py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">User Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-600 mb-2">{review.review}</p>
              <div className="text-yellow-500">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews;