export interface Category {
    id: string;
    name: string;
    color: string;
}

export interface Capacity {
    max: number;
    registered: number;
}

export interface Pricing {
    individual: number;
}

export interface Location {
    type: string;
    address: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    category: Category;
    capacity: Capacity;
    pricing: Pricing;
    location: Location;
}

export interface EventsResponse {
    events: Event[];
    total: number;
    lastKey?: string;
}

export interface RegistrationRequest {
    attendeeEmail: string;
    attendeeName: string;
    groupSize?: number;
}

export interface Attendee {
    email: string;
    name: string;
    groupSize: number;
    registeredAt: string;
}

export interface RegistrationResponse {
    success: boolean;
    registrationId: string;
    event: Event;
    attendee: Attendee;
}
