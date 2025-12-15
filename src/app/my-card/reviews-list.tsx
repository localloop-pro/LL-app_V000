import { Star } from "@/components/star"

export function ReviewsList() {
  // Simulated reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      text: "Amazing service and great atmosphere! Highly recommended.",
      date: "2 days ago",
      isVip: true,
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      text: "Really enjoyed my experience here. The staff was very friendly.",
      date: "1 week ago",
      isVip: false,
    },
  ]

  return (
    <div className="animate-slide-down bg-gray-800 p-4 space-y-4 border-t border-gray-700 min-w-[320px] max-w-[414px]">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">{review.author}</span>
              {review.isVip && <span className="bg-amber-500 text-xs px-2 py-0.5 rounded-full">VIP</span>}
            </div>
            <span className="text-gray-400 text-sm">{review.date}</span>
          </div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-gray-300">{review.text}</p>
        </div>
      ))}
    </div>
  )
}
