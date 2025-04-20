import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiEndpoint = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch missions');
    }

    const res = await response.json();
    return res.map((mission) => ({
      id: mission.mission_id,
      name: mission.mission_name,
      manufacturers: mission.manufacturers,
      payload_ids: mission.payload_ids,
      description: mission.description,
      website: mission.website,
      wikipedia: mission.wikipedia,
      twitter: mission.twitter,
    }));
  } catch (error) {
    return [];
  }
});

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
  missions: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'rocketsMissions',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const id = action.payload;
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: true };
      });
      localStorage.setItem('rockets', JSON.stringify(newRockets));
      return { ...state, rockets: newRockets }; // Return new state
    },
    cancelReservation: (state, action) => {
      const id = action.payload;
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        localStorage.setItem('rockets', JSON.stringify(newRockets));
        return { ...rocket, reserved: false };
      });
      return { ...state, rockets: newRockets }; // Return new state
    },
    joinedMission: (state, action) => {
      const id = action.payload;
      const newMissions = state.missions.map((mission) => {
        if (mission.id !== id) return mission;

        return { ...mission, joinedMission: true };
      });
      // state.missions = newMissions;
      localStorage.setItem('missions', JSON.stringify(newMissions));
      return { ...state, missions: newMissions }; 
    },

    leavedMission: (state, action) => {
      const id = action.payload;
      const newMissions = state.missions.map((mission) => {
        if (mission.id !== id) return mission;
        return { ...mission, joinedMission: false };
      });
        // state.missions = newMissions;
      localStorage.setItem('missions', JSON.stringify(newMissions));
      return { ...state, missions: newMissions }; 
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

    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        const storedMissions = localStorage.getItem('missions');
        if (storedMissions) {
          const reservedMissions = JSON.parse(storedMissions);
          const updatedMissions = action.payload.map((mission) => {
            const reservedMission = reservedMissions.find((r) => r.id === mission.id);
            return reservedMission ? { ...mission, joinedMission: true } : mission;
          });
          state.missions = updatedMissions;
        } else {
          state.missions = action.payload;
        }
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { reserveRocket, cancelReservation } = slice.actions;

export const { joinedMission, leavedMission } = slice.actions;

export default slice.reducer;

// export default missionSlice.reducer;

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
