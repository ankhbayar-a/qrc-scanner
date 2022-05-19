import { gql } from "@apollo/client";

export const GETSESSIONTODAY = gql`
  query GetSessionsToday {
    getSessionsToday {
      ID
      ScheduledFilmId
      Showtime
      ScreenName
      ScreenNumber
      SeatsAvailable
    }
  }
`;

export const GETCINEMA = gql`
  query CinemaName {
    getCinemas {
      Name
      ID
    }
  }
`;
