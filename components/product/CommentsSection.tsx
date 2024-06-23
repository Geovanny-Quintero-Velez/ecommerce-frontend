import { Review } from '@/interfaces/review/review';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface Props {
  reviews: Review[];
}

const SingleComment = ({ review }: { review: Review }) => {
  const filledStars = Math.floor(review.rate);
  const hasHalfStar = review.rate % 1 !== 0;

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <div className="bg-gray-200 rounded-full w-12 h-12">
          <img className= "rounded-full" src={review.userimageurl || ""} ></img>
        </div>
        <div className="ml-4">
          <div className="text-sm font-bold">{review.username}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="relative">
                {index < filledStars ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  index === filledStars && hasHalfStar ? (
                    <FaStarHalfAlt className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-gray-300" />
                  )
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500">{review.createdat ? review.createdat.toISOString().slice(0, 10) : "2024-06-23"}</div>
        </div>
      </div>
      <p className="text-gray-700">{review.description}</p>
    </div>
  );
};

const CommentsSection = ({ reviews }: Props) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg mt-4">
      <h2 className="text-xl font-bold">Comments Section</h2>
      {
      (reviews.length > 0) ?
      reviews.map((review) => (
        <SingleComment key={review.reviewid} review={review} />
      )):
      <span className="p-4 text-gray-600">No comments yet. Be the first to leave a comment for this product!</span>
      }
    </div>
  );
};

export default CommentsSection;
