export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    category?: Category;
}

export interface EventsResponse {
    events: Event[];
    total: number;
    lastKey?: string;
}
