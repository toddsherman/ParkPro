"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import { AppState, WeekSelection, ZoneWeekData } from "./types";
import { PARK_ZONES } from "./constants";

type Action =
  | { type: "SET_WEEK"; payload: WeekSelection }
  | { type: "SET_ACTIVE_ZONE"; payload: string | null }
  | { type: "SET_ZONE_DATA"; payload: { zoneId: string; data: ZoneWeekData } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_ALERTS"; payload: AppState["alerts"] }
  | { type: "SET_ALL_ZONE_DATA"; payload: Record<string, ZoneWeekData> };

const initialState: AppState = {
  selectedWeek: null,
  activeZoneId: null,
  zones: PARK_ZONES,
  zoneData: {},
  alerts: [],
  isLoading: false,
  error: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_WEEK":
      return { ...state, selectedWeek: action.payload, zoneData: {}, activeZoneId: null };
    case "SET_ACTIVE_ZONE":
      return { ...state, activeZoneId: action.payload };
    case "SET_ZONE_DATA":
      return {
        ...state,
        zoneData: { ...state.zoneData, [action.payload.zoneId]: action.payload.data },
      };
    case "SET_ALL_ZONE_DATA":
      return { ...state, zoneData: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_ALERTS":
      return { ...state, alerts: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  setWeek: (week: WeekSelection) => void;
  setActiveZone: (zoneId: string | null) => void;
  setZoneData: (zoneId: string, data: ZoneWeekData) => void;
  setAllZoneData: (data: Record<string, ZoneWeekData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAlerts: (alerts: AppState["alerts"]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setWeek = useCallback((week: WeekSelection) => {
    dispatch({ type: "SET_WEEK", payload: week });
  }, []);

  const setActiveZone = useCallback((zoneId: string | null) => {
    dispatch({ type: "SET_ACTIVE_ZONE", payload: zoneId });
  }, []);

  const setZoneData = useCallback((zoneId: string, data: ZoneWeekData) => {
    dispatch({ type: "SET_ZONE_DATA", payload: { zoneId, data } });
  }, []);

  const setAllZoneData = useCallback((data: Record<string, ZoneWeekData>) => {
    dispatch({ type: "SET_ALL_ZONE_DATA", payload: data });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const setAlerts = useCallback((alerts: AppState["alerts"]) => {
    dispatch({ type: "SET_ALERTS", payload: alerts });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setWeek,
        setActiveZone,
        setZoneData,
        setAllZoneData,
        setLoading,
        setError,
        setAlerts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
