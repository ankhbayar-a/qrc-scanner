import { gql } from "@apollo/client";
// Get Booking By BookingNumber
export const GETBOOKING_NUMBER = gql`
  query GetBookingByNumber($bookingNumber: Int!) {
    getBookingByNumber(BookingNumber: $bookingNumber) {
      ResultCode
      ErrorDescription
      SingleBookingMatch {
        BookingId
        BookingNumber
        Tickets {
          Description
          MovieName
          SeatRowId
          SeatNumber
        }
      }
      BookingSearchResults
    }
  }
`;

// Get Booking by BookingId
export const GETBOOKING_ID = gql`
  mutation Mutation($bookingId: ID!) {
    getBookingById(BookingId: $bookingId) {
      ResultCode
      SingleBookingMatch {
        Tickets {
          SeatRowId
          MovieName
          Description
          SeatNumber
        }
        BookingNumber
      }
    }
  }
`;
