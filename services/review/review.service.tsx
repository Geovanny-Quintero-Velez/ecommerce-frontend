import {Review } from '@/interfaces/review/review';

export class ReviewService {

    private generateUniqueImageUrl = () => {
        var randomNumber = Math.floor(Math.random() * 99) + 1;
        var gender = Math.round(Math.random());
        return `https://randomuser.me/api/portraits/${gender==1? 'men':'women'}/${randomNumber}.jpg`;
    }
    

    sampleReviews: Review[] = [
        {
            reviewid: "a1",
            userid: "a",
            productid: "1",
            description: "This is a good product. Looks easy to store.",
            rate: 4.0,
            username: "JohnDoeGod",
            userimageurl: this.generateUniqueImageUrl()
        },
        {
            reviewid: "b1",
            userid: "b",
            productid: "1",
            description: "Thanks for all. It was awesome!",
            rate: 4.9,
            username: "MarySmidthGoddess",
            userimageurl: this.generateUniqueImageUrl()
        },
        {
            reviewid: "c1",
            userid: "c",
            productid: "1",
            description: "Its ok but don't expect for too much",
            rate: 3.7,
            username: "JamesMorganGod",
            userimageurl: this.generateUniqueImageUrl()
        },
        {
            reviewid: "a2",
            userid: "a",
            productid: "2",
            description: "Excellent!",
            rate: 5.0,
            username: "JohnDoeGod",
            userimageurl: this.generateUniqueImageUrl()
        },
        {
            reviewid: "b2",
            userid: "b",
            productid: "2",
            description: "What an awesome website!",
            rate: 5.0 ,
            username: "MarySmidthGoddess",
            userimageurl: this.generateUniqueImageUrl()
        },
    ]

    public async getReviews(): Promise<Review[]> {
        return this.sampleReviews;
    }

    public async getReviewsByProductId(productId: string): Promise<Review[]> {
        return this.sampleReviews.filter(review => review.productid === productId);
    }
}