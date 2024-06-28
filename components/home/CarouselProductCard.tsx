import { Product } from '@/interfaces/product/product';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    product: Product;
  }


const CarouselProductCard = ({ product }: Props) => {
    const { images, name, price, discount, rating } = product;
          const filledStars = Math.floor(rating);
          const hasHalfStar = rating % 1 !== 0;

          return (
            <div key={product.productid} className="p-2">
              <div className="hover:cursor-pointer border rounded-lg overflow-hidden shadow-lg">
                <Link href={`/product/info?productid=${product.productid}`} >
                  <Image
                    src={images ? images[0].img : ""}
                    alt={name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <div className="flex items-center mb-2">
                      {discount ? (
                        <>
                          <span className="mr-2 line-through text-gray-600">${price}</span>
                          <span className="textSecondary font-semibold">${(price*(1-(discount/100)))}</span>
                        </>
                      ) : (
                        <>
                          <span className="textStandard font-semibold">${price}</span>
                        </>
                      )}
                    </div>
                    <div className="h-4 mb-2 text-sm text-gray-500">
                      {discount && (
                        <>%{discount}</>
                      )}
                    </div>
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
                      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
}

export default CarouselProductCard;
