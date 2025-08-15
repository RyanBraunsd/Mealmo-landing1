"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Camera,
  SlidersHorizontal,
  UtensilsCrossed,
  SearchCheck,
  BrainCircuit,
  LeafyGreen,
  Star,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import ImageCarousel from "./components/image-carousel"

export default function MealmoLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false)

  // Replace with your actual GHL webhook URL
  const GHL_WEBHOOK_URL = "YOUR_GHL_WEBHOOK_URL_HERE"

  const openWaitlistModal = (buttonLocation = "unknown") => {
    setIsModalOpen(true)
    // Track button click
    trackEvent("waitlist_button_clicked", { button_location: buttonLocation })
  }

  const handleWaitlistClick = (buttonLocation: string) => {
    openWaitlistModal(buttonLocation)
  }

  const handleSurveyClick = (buttonLocation: string) => {
    setIsSurveyModalOpen(true)
    trackEvent("survey_button_clicked", { button_location: buttonLocation })
  }

  // Function to track events to GHL
  const trackEvent = async (eventType: string, additionalData: any = {}) => {
    if (!GHL_WEBHOOK_URL || GHL_WEBHOOK_URL === "YOUR_GHL_WEBHOOK_URL_HERE") {
      console.log("GHL webhook not configured")
      return
    }

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
          page_title: document.title,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          ...additionalData
        })
      })
      console.log(`Event tracked: ${eventType}`)
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }

  // Load the survey script when component mounts
  useEffect(() => {
    // Load the waitlist survey script
    const waitlistScript = document.createElement('script')
    waitlistScript.src = 'https://api.ezaisystems.com/js/form_embed.js'
    waitlistScript.async = true
    document.head.appendChild(waitlistScript)

    // Load the GHL form script for the popup survey
    const surveyScript = document.createElement('script')
    surveyScript.src = 'https://api.ezaisystems.com/js/form_embed.js'
    surveyScript.async = true
    if (!document.head.querySelector(`script[src="${surveyScript.src}"]`)) {
      document.head.appendChild(surveyScript)
    }

    // Track page view when component mounts
    trackEvent("page_view", { 
      section: "landing_page",
      visitor_type: "new_visitor" 
    })

    return () => {
      // Cleanup scripts when component unmounts
      if (document.head.contains(waitlistScript)) {
        document.head.removeChild(waitlistScript)
      }
      if (document.head.contains(surveyScript)) {
        document.head.removeChild(surveyScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex justify-between items-center">
            <Image
              src="/logo.png"
              alt="MEALMO - AI-powered meal planning"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="ghost"
                className="text-gray-700 hover:text-forest-green hover:bg-sage-green/20 font-semibold"
              >
                <a href="/blog" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </Button>
              <Button
                onClick={() => handleWaitlistClick("header")}
                className="bg-forest-green hover:bg-bright-green text-white px-6 py-2 rounded-full font-semibold"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 pt-32">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-powered meal planning that thinks like your grandma.{" "}
                <span className="text-forest-green">
                  Spend less time deciding, more time enjoying food you already have
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stop meal planning overwhelm - Let our AI save you time and money
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => handleWaitlistClick("hero_section")}
                size="lg"
                className="bg-forest-green hover:bg-bright-green text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hero Visual Section with Help Shape MealMO */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Help Shape MealMO Section - Left Side */}
            <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Help Shape MealMO</h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Receive exclusive discounts + a chance to win a $25 grocery gift card
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  onClick={() => handleSurveyClick("hero_section")}
                  size="lg"
                  className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-6 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Take the 3-Minute Survey →
                </Button>
              </div>
            </div>

            {/* Hero Visual - Image Carousel - Right Side */}
            <div className="order-1 lg:order-2 relative">
              <ImageCarousel />

              {/* App Mockup Overlay */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-sage-green/30">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why MealMO Exists</h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  MealMO was born out of one simple frustration: planning meals is harder than it should be. Between
                  busy schedules, rising grocery prices, dietary restrictions, and forgotten pantry items, most of us
                  either overspend, waste food, or give up and order takeout.
                </p>
                <p>
                  We realized there was no tool that truly helped people plan meals based on what they already have, let
                  alone one that actually saved them money while doing it. So we decided to build one.
                </p>
                <p>
                  MealMO is an AI-powered assistant that helps you create a custom weekly meal plan using the food
                  already in your kitchen, your dietary goals, and real-time deals at grocery stores near you. It
                  combines the logic of a meal planner, the insight of a dietitian, and the efficiency of a personal
                  shopper — all in one clean, easy-to-use experience.
                </p>
                <p>
                  This isn't just a food app. It's our way of helping people eat better, waste less, and take back
                  control of their time and budgets — with as little friction as possible.
                </p>
                <p className="font-semibold text-forest-green">
                  We're launching MealMO because we believe meal planning shouldn't be a chore — and saving money
                  shouldn't come at the cost of eating well. Our mission is to make intentional eating as effortless as
                  ordering takeout.
                </p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/stock images/pexels-ella-olsson-572949-1640777.jpg"
                alt="Warm, inviting kitchen with natural lighting, wooden countertops, and fresh ingredients"
                fill
                className="object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Your Effortless Meal Planning System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-ocean-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scan & Sync</h3>
                <p className="text-gray-600 leading-relaxed">Snap pantry items or connect grocery accounts</p>
              </div>
            </div>

            <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto">
                <SlidersHorizontal className="h-8 w-8 text-forest-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personalize</h3>
                <p className="text-gray-600 leading-relaxed">Set dietary needs, preferences & budget</p>
              </div>
            </div>

            <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto">
                <UtensilsCrossed className="h-8 w-8 text-ocean-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy & Save</h3>
                <p className="text-gray-600 leading-relaxed">Our AI will locate local deals to save you money </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-sky-blue/20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Finally, Meal Planning That Works For You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mb-6">
                <SearchCheck className="h-8 w-8 text-forest-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Pantry Scanning</h3>
              <p className="text-gray-600 leading-relaxed">90%+ accurate AI recognition reduces food waste</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center mb-6">
                <BrainCircuit className="h-8 w-8 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ADHD-Friendly Routines</h3>
              <p className="text-gray-600 leading-relaxed">Decision-reducing workflows for neurodivergent users</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mb-6">
                <LeafyGreen className="h-8 w-8 text-forest-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Waste Less, Eat Better</h3>
              <p className="text-gray-600 leading-relaxed">13% average dietary improvement in beta tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 italic mb-4">"This app thinks for me!"</blockquote>
              <cite className="text-gray-600 font-semibold">— Sarah R. (ADHD user)</cite>
            </div>

            <div className="bg-gradient-to-r from-forest-green to-bright-green text-white p-6 rounded-2xl">
              <p className="text-2xl font-bold">Join 1,200+ early supporters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage-green/30 to-sky-blue/30">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">Take Back Your Kitchen & Time</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join our waitlist for exclusive launch access</p>
            </div>

            <Button
              onClick={() => handleWaitlistClick("bottom_cta")}
              size="lg"
              className="bg-forest-green hover:bg-bright-green text-white px-12 py-6 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Join Waitlist
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>

            {/* Help Shape MealMO Section */}
            <div className="mt-16 space-y-6">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">Help Shape MealMO</h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Receive exclusive discounts + a chance to win a $25 grocery gift card
              </p>
              <Button
                onClick={() => handleSurveyClick("help_shape_section")}
                size="lg"
                className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Take the 3-Minute Survey →
              </Button>
            </div>

            <div className="mt-12 relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/stock images/pexels-janetrangdoan-1099680.jpg"
                alt="MEALMO app showing weekly meal plan with personalized recipes and shopping list"
                fill
                className="object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="MEALMO" width={100} height={32} className="h-8 w-auto opacity-60" />
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">Join the MEALMO Waitlist</DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center space-y-4">
            <p className="text-gray-600">Be the first to know when MEALMO launches and get exclusive early access!</p>
            
            {/* Survey Iframe */}
            <div className="w-full h-[750px] rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://api.ezaisystems.com/widget/survey/IsScQ7ituQ2oMefDvhlL"
                width="100%"
                height="100%"
                style={{ border: 'none', width: '100%' }}
                scrolling="no"
                id="IsScQ7ituQ2oMefDvhlL"
                title="survey"
                className="w-full h-full"
              />
            </div>
            
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="w-full mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Survey Modal */}
      <Dialog open={isSurveyModalOpen} onOpenChange={setIsSurveyModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">Help Shape MealMO</DialogTitle>
            <p className="text-gray-600 text-center">Take our 3-minute survey to help us build the perfect meal planning experience for you!</p>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {/* GHL Survey Form */}
            <div className="w-full h-[75vh] overflow-auto">
              <iframe
                src="https://api.ezaisystems.com/widget/form/Pt0x5wTWJnKU3A4ETcBx"
                style={{ width: '100%', height: '100%', minHeight: '800px', border: 'none' }}
                id="survey-form-Pt0x5wTWJnKU3A4ETcBx"
                title="Help Shape MealMO Survey"
                className="w-full"
                scrolling="yes"
                frameBorder="0"
              />
            </div>
          </div>
          <div className="p-4 border-t">
            <Button onClick={() => setIsSurveyModalOpen(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
