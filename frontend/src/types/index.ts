export interface Suggestion {
    name: string
    category: "Eat" | "Drink" | "Hangout"
    description: string
    location: string
    rating: number
    mapUrl: string
}