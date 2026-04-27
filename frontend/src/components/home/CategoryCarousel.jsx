import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Science",
    "FullStack Developer"
]

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem className="md:basis-1/2 lg-basis-1/3 pl-14">
                        <Button variant="outline" className="rounded-full w-full flex justify-center border-gray-300 text-gray-700">{cat}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
