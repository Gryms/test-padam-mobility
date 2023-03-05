import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Ride = {
  id: number;
  departureStop: string;
  departureTime: string;
  arrivalStop: string;
  arrivalTime: string;
};

export enum ApiCallStatus {
  "idle",
  "loading",
  "success",
  "error",
}

export const rideSlice = createSlice({
  name: "ride",
  initialState: {
    availableDepartureStop: [] as string[],
    availableRides: [] as Ride[],
    selectedDepartureStop: "",
    selectedRide: {} as Ride,
    availableDepartureStopsStatus: ApiCallStatus.idle as ApiCallStatus,
    availableRidesStatus: ApiCallStatus.idle as ApiCallStatus,
    bookRideStatus: ApiCallStatus.idle as ApiCallStatus,
    error: null as string | null,
    booked: false,
  },
  reducers: {
    chooseDepartureStops: (state, action) => {
      state.selectedDepartureStop = action.payload;
    },
    chooseRide: (state, action) => {
      state.selectedRide = action.payload;
    },
    wipeState: (state) => {
      state.availableDepartureStop = [] as string[];
      state.availableRides = [] as Ride[];
      state.selectedDepartureStop = "";
      state.selectedRide = {} as Ride;
      state.availableDepartureStopsStatus = ApiCallStatus.idle;
      state.availableRidesStatus = ApiCallStatus.idle;
      state.bookRideStatus = ApiCallStatus.idle;
      state.error = null;
      state.booked = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDepartureStops.pending, (state) => {
        state.availableDepartureStopsStatus = ApiCallStatus.loading;
      })
      .addCase(fetchDepartureStops.fulfilled, (state, action) => {
        state.availableDepartureStopsStatus = ApiCallStatus.success;
        state.availableDepartureStop = action.payload;
      })
      .addCase(fetchDepartureStops.rejected, (state, action) => {
        state.availableDepartureStopsStatus = ApiCallStatus.error;
        state.error = action.error.message || null;
      })
      .addCase(fetchRides.pending, (state) => {
        state.availableRidesStatus = ApiCallStatus.loading;
      })
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.availableRidesStatus = ApiCallStatus.success;
        state.availableRides = action.payload;
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.availableRidesStatus = ApiCallStatus.error;
        state.error = action.error.message || null;
      })
      .addCase(bookRide.pending, (state) => {
        state.bookRideStatus = ApiCallStatus.loading;
      })
      .addCase(bookRide.fulfilled, (state, action) => {
        state.bookRideStatus = ApiCallStatus.success;
        state.booked = action.payload.success;
      })
      .addCase(bookRide.rejected, (state, action) => {
        state.bookRideStatus = ApiCallStatus.error;
        state.error = action.error.message || null;
      });
  },
});

export const fetchDepartureStops = createAsyncThunk(
  "departureStops/fetchDepartureStops",
  async () => {
    const response = await fetch(
      "https://6130d11c8066ca0017fdaa97.mockapi.io/stops"
    );
    return response.json();
  }
);

export const fetchRides = createAsyncThunk(
  "rides/fetchRides",
  async (departureStop: string) => {
    const response = await fetch(
      `https://6130d11c8066ca0017fdaa97.mockapi.io/trips?departureStop=${departureStop}`
    );
    return response.json();
  }
);

export const bookRide = createAsyncThunk(
  "rides/bookRide",
  async (rideId: string) => {
    const requestOptions = {
      method: "PUT",
    };
    const response = await fetch(
      `https://6130d11c8066ca0017fdaa97.mockapi.io/book/${rideId}`,
      requestOptions
    );
    return response.json();
  }
);

export const { chooseDepartureStops, chooseRide } = rideSlice.actions;

export const selectorAvailableDepartureStops = (state: RootState) =>
  state.ride.availableDepartureStop;
export const selectorAvailableRides = (state: RootState) =>
  state.ride.availableRides;
export const selectorSelectedDepartureStop = (state: RootState) =>
  state.ride.selectedDepartureStop;
export const selectorSelectedRide = (state: RootState) =>
  state.ride.selectedRide;
export const selectorAvailableDepartureStopsStatus = (state: RootState) =>
  state.ride.availableDepartureStopsStatus;
export const selectorAvailableRidesStatus = (state: RootState) =>
  state.ride.availableRidesStatus;
export const selectorBookRideStatus = (state: RootState) =>
  state.ride.bookRideStatus;
export const selectorError = (state: RootState) => state.ride.error;
export const selectorBooked = (state: RootState) => state.ride.booked;

export default rideSlice.reducer;