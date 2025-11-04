
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  // Add other event properties here based on the openapi.yaml spec
}

export interface EventsResponse {
  events: Event[];
  total: number;
  lastKey?: string;
}
