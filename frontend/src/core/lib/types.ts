import store from "@/store";
import { IUser } from "@/types/user";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  phone: string;
  gender: string;
  last_login: string;
}

export interface VehicleFeature {
  id: number;
  feature: string;
}

export interface IImage {
  id: number;
  image: string;
}

export interface Vehicle {
  id: number;
  type: "sedan" | "SUV" | "premium-suv" | "sprinter-van";
  model: string;
  price_per_mile: number;
  price_per_hour: number;
  description: string;
  luggages: number;
  flat_rate: number;
  passengers: number;
  status: boolean;
  features: VehicleFeature[];
  images: IImage[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  slug: string;
  description: string;
  content: any; // Editor.js output
  image_cover?: string;
  image1?: string;
  image2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceArea {
  id: number;
  slug: string;
  area_name: string;
  description: string;
  content: any; // Editor.js output
  image_cover?: string;
  image1?: string;
  image2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Passenger {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Stop {
  stop_location: string;
  order: string;
  // reason: string;
}

export interface ChildSeat {
  id: number;
  type: "booster" | "rear_facing" | "forward_facing";
  quantity: number;
  total_price: string;
}

export interface Comment {
  id: number;
  text: string;
}

export interface BookingPayment {
  payment_method: string;
  transaction_id: string;
  total_cost: string;
  payment_status: boolean;
  paid_at: string;
}

export interface BookingUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
  phone: string;
  is_active: boolean;
  date_joined: string;
  gender: string;
}

export interface FlightInfo {
  flight_number: string;
  airline_name: string;
  meet_and_greet: boolean;
  arrival_time: string;
}

export interface BookingReview {
  id: number;
  rating: string;
  comment: string;
}

export interface Booking {
  id: number;
  user: BookingUser | null;
  passengers: Passenger[];
  stops: Stop[];
  child_seats: ChildSeat[];
  promo_code: string | null;
  flight_info: FlightInfo | null;
  comments: Comment[];
  payment: BookingPayment | null;
  review: BookingReview | null;
  type_of_ride:
    | "from-airport"
    | "to-airport"
    | "point-to-point"
    | "hourly-as-directed"
    | "wine-tour"
    | "tour"
    | "prom"
    | "weddings";
  pickup_address: string;
  dropoff_address: string;
  pickup_datetime: string;
  distance: number;
  price: string;
  status: "pending" | "completed" | "confirmed" | "canceled";
  payment_status: boolean;
  number_of_hours: number | null;
  created_at: string;
  updated_at: string;
  vehicle: number;
  is_discounted: boolean;
}

export interface DashboardMetrics {
  totalUsers: number;
  monthlyBookings: number;
  totalBookings: number;
  totalRevenue: number;
  recentUsers: number;
  completedBookings: number;
}

export interface RideType {
  id: number;
  name: string;
  description: string;
}

export interface Tax {
  id: number;
  region_or_state: string;
  rate_percentage: number;
}

export interface IContactUsQuery {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

export interface IGetAllResponse {
  count: number;
  next: null;
  previous: null;
  results: any[];
}

export interface IGetAllUsersResponse {
  data: User[];
}

export type RootState = ReturnType<typeof store.getState>;
