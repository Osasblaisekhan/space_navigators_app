import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v4/rockets', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Unable to fetch rockets');
    } else {
      const res = await response.json();
      //   console.log('this elem', res);
      res.map((rocket) => {
        // console.log('this rpocket', rocket);
        const elem = {
          name: rocket.name,
          description: rocket.description,
          flickr_images: rocket.flickr_images[0],
        };
        return elem;
      });
      return res;
    }
  } catch {
    // console.log('Unable to fetch rockets', error);
    return [];
  }
});

const initialState = {
  rockets: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const id = action.payload;
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newRockets }; // Return new state
    },
    cancelReservation: (state, action) => {
      const id = action.payload;
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: false };
      });
      return { ...state, rockets: newRockets }; // Return new state
    },
  },
  extraReducers: (builder) => {
    builder
    // Return new state
      .addCase(fetchRockets.pending,
        (state) => ({ ...state, loading: true, error: null }))
      .addCase(fetchRockets.fulfilled, (state, action) => {
        const storedRockets = localStorage.getItem('rockets');
        if (storedRockets) {
          const reservedRockets = JSON.parse(storedRockets);
          const updatedRockets = action.payload.map((rocket) => {
            const reservedRocket = reservedRockets.find((r) => r.id === rocket.id);
            return reservedRocket ? { ...rocket, reserved: true } : rocket;
          });
          return { ...state, rockets: updatedRockets, loading: false }; // Return new state
        }
        return { ...state, rockets: action.payload, loading: false }; // Return new state
      })
      // Return new state
      .addCase(fetchRockets.rejected,
        (state, action) => ({ ...state, loading: false, error: action.error.message }));
  },
});
export const { reserveRocket, cancelReservation } = slice.actions;

export default slice.reducer;

// const slice = createSlice({
//   name: 'rockets',
//   initialState,
//   reducers: {
//     reserveRocket: (state, action) => {
//       const id = action.payload;
//       console.log('yoo osas this is the id you console>', id);
//       const newRockets = state.rockets.map((rocket) => {
//         if (rocket.id !== id) return rocket;
//         return { ...rocket, reserved: true };
//       });
//       // Update rockets state
//       state.rockets = newRockets;
//       localStorage.setItem('rockets', JSON.stringify(newRockets));
//     },
//     cancelReservation: (state, action) => {
//       const id = action.payload;
//       const newRockets = state.rockets.map((rocket) => {
//         if (rocket.id !== id) return rocket;
//         // Remove reserved key
//         return { ...rocket, reserved: false };
//       });
//       // Update rockets state
//       state.rockets = newRockets;
//       localStorage.setItem('rockets', JSON.stringify(newRockets));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRockets.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRockets.fulfilled, (state, action) => {
//         state.loading = false;
//         // Merge with stored rockets if they exist
//         const storedRockets = localStorage.getItem('rockets');
//         if (storedRockets) {
//           const reservedRockets = JSON.parse(storedRockets);
//           const updatedRockets = action.payload.map((rocket) => {
//             const reservedRocket = reservedRockets.find((r) => r.id === rocket.id);
//             return reservedRocket ? { ...rocket, reserved: true } : rocket;
//           });
//           state.rockets = updatedRockets;
//         } else {
//           state.rockets = action.payload;
//         }
//       })
//       .addCase(fetchRockets.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });
