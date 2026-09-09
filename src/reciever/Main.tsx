import React from 'react';
import "./Main.css";

interface ReviewData {
  id: number;
  rating: number;
  timeAgo: string;
  title: string;
  content: string;
  authorInitial: string;
  authorName: string;
  avatarBg: string;
}

const reviews: ReviewData[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  rating: i % 2 === 0 ? 5 : 4,
  timeAgo: i % 2 === 0 ? "2 days ago" : "1 week ago",
  title: i % 2 === 0 ? "Absolutely Exquisite!" : "Solid Product, Great Value",
  content: i % 2 === 0
      ? "From the moment I unboxed this, I was impressed by the quality and craftsmanship. It has exceeded all my expectations."
      : "Does exactly what it says on the tin. Very happy with the purchase, and it was delivered quickly. One minor feature request, but overall a great experience.",
  authorInitial: i % 2 === 0 ? "B" : "L",
  authorName: i % 2 === 0 ? "Bianca G." : "Leo K.",
  avatarBg: i % 2 === 0 ? "bg-slate-400" : "bg-slate-800"
}));

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export default function Main() {
  return (
      <div className="review-container">
        <div className="review-grid">
          {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < review.rating} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">{review.timeAgo}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{review.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{review.content}</p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${review.avatarBg}`}>
                    {review.authorInitial}
                  </div>
                  <span className="font-medium text-gray-900">{review.authorName}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}