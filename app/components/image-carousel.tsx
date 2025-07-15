"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const carouselImages = [
  {
    src: "/Group 5 (2).png",
    alt: "Fresh pantry ingredients including vegetables, grains, and spices organized on wooden shelves",
  },
  {
    src: "/Group 6 (1).png",
    alt: "Happy family of four enjoying a home-cooked meal together at dining table",
  },
  {
    src: "/Group 7 (1).png",
    alt: "Colorful meal prep containers with balanced portions of proteins, vegetables, and grains",
  },
  {
    src: "/Group 10 (3).png",
    alt: "Person scanning pantry items with smartphone using MEALMO app",
  },
  {
    src: "/Group 11 (1).png",
    alt: "Nutritious breakfast spread with fruits, yogurt, and whole grains",
  },
  {
    src: "/Group 12 (1).png",
    alt: "Chef preparing fresh ingredients in modern kitchen",
  },
  {
    src: "/Group 13 (2).png",
    alt: "Grocery shopping with smartphone showing MEALMO recommendations",
  },
  {
    src: "/Group 14.png",
    alt: "Organized refrigerator with labeled containers and fresh produce",
  },
]

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      {/* Main Carousel Container */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
        {/* Carousel Images */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-contain transition-opacity duration-500"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="sm"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-lg z-10 w-8 h-8 md:w-10 md:h-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        <Button
          onClick={goToNext}
          variant="outline"
          size="sm"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-lg z-10 w-8 h-8 md:w-10 md:h-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        {/* Slide Counter */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
          {currentSlide + 1} / {carouselImages.length}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 md:mt-6 space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-forest-green scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Navigation (Optional - shows on larger screens) */}
      <div className="hidden lg:flex justify-center mt-3 space-x-1.5 overflow-x-auto pb-2">
        {carouselImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-12 h-9 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
              index === currentSlide
                ? "border-forest-green shadow-lg scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image 
              src={image.src || "/placeholder.svg"} 
              alt={`Thumbnail ${index + 1}`} 
              fill 
              className="object-contain" 
              sizes="48px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
