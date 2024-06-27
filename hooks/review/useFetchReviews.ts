import {Review} from '@/interfaces/review/review';
import {ReviewService} from '@/services/review/review.service';

export const useFetchReviews = () => {
    const reviewService = new ReviewService();

    const fetchReviews = async () => {
        const reviews = await reviewService.getReviews();
        return reviews as Review[];
    }

    const fetchReviewsByProductId = async (productId: string) => {
        const reviewsByProduct = await reviewService.getReviewsByProductId(productId);
        return reviewsByProduct as Review[];
    }

    const averageRating = async (productId: string) => {
        try {
            const reviewsByProduct: Review[] = await reviewService.getReviewsByProductId(productId);
            
            if (reviewsByProduct.length === 0) {
                return 0;
            }
    
            const totalRatings = reviewsByProduct.reduce((sum, review) => sum + review.rate, 0);
            const averageRating = totalRatings / reviewsByProduct.length;

            const roundedAverageRating = Math.round(averageRating * 100) / 100;
    
            return roundedAverageRating;
        } catch (error) {
            console.error('Error al calcular el rating promedio:', error);
            throw error;
        }
    };

    return {fetchReviews, fetchReviewsByProductId, averageRating}
}