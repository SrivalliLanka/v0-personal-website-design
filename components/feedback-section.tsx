"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Feedback {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

export function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  })
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchFeedback()

    const channel = supabase
      .channel("feedback_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "feedback",
        },
        (payload) => {
          console.log("[v0] New feedback received:", payload)
          setFeedbacks((prev) => [payload.new as Feedback, ...prev])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching feedback:", error.message)
        if (
          error.message.includes("Could not find the table") ||
          (error.message.includes("relation") && error.message.includes("does not exist"))
        ) {
          setError("Database table not found. Please run the setup script first.")
        } else {
          setError("Failed to load feedback. Please try again later.")
        }
        return
      }

      setFeedbacks(data || [])
      setError(null)
    } catch (error) {
      console.error("[v0] Error fetching feedback:", error)
      setError("Failed to load feedback. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from("feedback")
        .insert([
          {
            name: formData.name,
            message: formData.message,
            rating: formData.rating,
          },
        ])
        .select()

      if (error) {
        console.error("[v0] Error submitting feedback:", error.message)
        if (
          error.message.includes("Could not find the table") ||
          (error.message.includes("relation") && error.message.includes("does not exist"))
        ) {
          alert("Database table not found. Please run the setup script first.")
        } else {
          alert("Error submitting feedback. Please try again.")
        }
        return
      }

      console.log("[v0] Feedback submitted successfully:", data)

      setFormData({ name: "", message: "", rating: 5 })
      alert("Thank you for your feedback!")

      setError(null)
    } catch (error) {
      console.error("[v0] Error submitting feedback:", error)
      alert("Error submitting feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }))
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={interactive ? () => handleRatingChange(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
            disabled={!interactive}
          >
            <Star className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="feedback" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-balance">Feedback</h2>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Setup Required</p>
                <p className="text-red-700 text-sm">
                  {error} Please run the database setup script:{" "}
                  <code className="bg-red-100 px-1 rounded">scripts/001_create_feedback_table.sql</code>
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  I'd love to hear your thoughts and suggestions. Your feedback helps me improve!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Feedback"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    {renderStars(formData.rating, true)}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || !!error}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
                <p className="text-muted-foreground leading-relaxed">
                  See what others are saying about my work and experience.
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading feedback...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Unable to load feedback. Please check the database setup.</p>
                </div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {feedbacks.map((feedback) => (
                    <Card key={feedback.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{feedback.name}</h4>
                          <span className="text-xs text-muted-foreground">{formatDate(feedback.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {renderStars(feedback.rating)}
                          <span className="text-sm text-muted-foreground">({feedback.rating}/5)</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{feedback.message}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
