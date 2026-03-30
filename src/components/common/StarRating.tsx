import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // e.g., 3.5, 4.2
  count?: number; // e.g., 95 (review count)
}

export default function StarRating({ rating = 0, count }: StarRatingProps) {
  return (
    <div className="flex items-center gap-2 font-medium">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => {
          const fillPercentage = Math.min(
            100,
            Math.max(0, (rating - index) * 100),
          );

          return (
            <div key={index} className="relative w-4 h-4">
              {/* Background Star */}
              <Star
                className="w-full h-full text-gray-300"
                fill="currentColor"
                strokeWidth={0}
              />

              {/* Foreground Star */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>
            </div>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-gray-400 text-sm">({count})</span>
      )}
    </div>
  );
}
