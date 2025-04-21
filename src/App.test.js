import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  fetchRockets,
  fetchMissions,
  reserveRocket,
  cancelReservation,
  joinedMission,
  leavedMission,
} from './slice'; // Adjust the import path as necessary

const mockStore = () => configureStore({
  reducer: {
    rocketsMissions: reducer,
  },
});

describe('rocketsMissionsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should fetch rockets successfully', async () => {
    const rocketsData = [
      {
        id: '1', name: 'Falcon 1', description: 'Description 1', flickr_images: ['image1.jpg'],
      },
      {
        id: '2', name: 'Falcon 9', description: 'Description 2', flickr_images: ['image2.jpg'],
      },
    ];

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(rocketsData),
    }));

    await store.dispatch(fetchRockets());

    const state = store.getState().rocketsMissions;
    expect(state.rockets).toEqual(rocketsData);
    expect(state.loading).toBe(false);
  });

  it('should handle fetch rockets failure', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
    }));

    await store.dispatch(fetchRockets());

    const state = store.getState().rocketsMissions;
    expect(state.rockets).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Unable to fetch rockets');
  });

  it('should fetch missions successfully', async () => {
    const missionsData = [
      { mission_id: '1', mission_name: 'Mission 1', description: 'Description 1' },
      { mission_id: '2', mission_name: 'Mission 2', description: 'Description 2' },
    ];

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(missionsData),
    }));

    await store.dispatch(fetchMissions());

    const state = store.getState().rocketsMissions;
    expect(state.missions).toEqual(missionsData);
    expect(state.loading).toBe(false);
  });

  it('should handle fetch missions failure', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
    }));

    await store.dispatch(fetchMissions());

    const state = store.getState().rocketsMissions;
    expect(state.missions).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('null');
  });

  it('should reserve a rocket', () => {
    const initialState = {
      rockets: [{ id: '1', reserved: false }],
      missions: [],
      loading: false,
      error: null,
    };

    store = mockStore(initialState);
    store.dispatch(reserveRocket('1'));

    const state = store.getState().rocketsMissions;
    expect(state.rockets[0].reserved).toBe(true);
  });

  it('should cancel a rocket reservation', () => {
    const initialState = {
      rockets: [{ id: '1', reserved: true }],
      missions: [],
      loading: false,
      error: null,
    };

    store = mockStore(initialState);
    store.dispatch(cancelReservation('1'));

    const state = store.getState().rocketsMissions;
    expect(state.rockets[0].reserved).toBe(false);
  });

  it('should join a mission', () => {
    const initialState = {
      rockets: [],
      missions: [{ id: '1', joinedMission: false }],
      loading: false,
      error: null,
    };

    store = mockStore(initialState);
    store.dispatch(joinedMission('1'));

    const state = store.getState().rocketsMissions;
    expect(state.missions[0].joinedMission).toBe(true);
  });

  it('should leave a mission', () => {
    const initialState = {
      rockets: [],
      missions: [{ id: '1', joinedMission: true }],
      loading: false,
      error: null,
    };

    store = mockStore(initialState);
    store.dispatch(leavedMission('1'));

    const state = store.getState().rocketsMissions;
    expect(state.missions[0].joinedMission).toBe(false);
  });
});
