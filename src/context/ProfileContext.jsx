import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProfile } from "../data/profiles";

const ProfileContext = createContext(null);

const STORAGE_KEY = "inclusa.profile.v1";

const DEFAULT_A11Y = { fontScale: 100, reduceMotion: false, highContrast: false, simplified: false, lowData: false, captions: false, voiceAssist: false };

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return { profileId: null, onboarded: false, a11y: DEFAULT_A11Y, name: "Alex" };
}

export function ProfileProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable — app still works in-memory */
    }
  }, [state]);

  const profile = useMemo(() => getProfile(state.profileId), [state.profileId]);

  // Apply the adaptive engine to the document root.
  useEffect(() => {
    const root = document.documentElement;
    const hue = profile ? profile.hue : 28;
    root.style.setProperty("--profile-hue", String(hue));
    root.style.setProperty("--base-font-scale", `${state.a11y.fontScale}%`);
    root.classList.toggle("reduce-motion", !!state.a11y.reduceMotion);
    root.classList.toggle("high-contrast", !!state.a11y.highContrast);
  }, [profile, state.a11y]);

  const selectProfile = useCallback((id) => {
    const p = getProfile(id);
    setState((s) => ({
      ...s,
      profileId: id,
      a11y: { ...DEFAULT_A11Y, ...(p ? p.defaults ? mapDefaults(p.defaults) : {} : {}) },
    }));
  }, []);

  const completeOnboarding = useCallback((patch = {}) => {
    setState((s) => ({ ...s, onboarded: true, a11y: { ...s.a11y, ...patch } }));
  }, []);

  const updateA11y = useCallback((patch) => {
    setState((s) => ({ ...s, a11y: { ...s.a11y, ...patch } }));
  }, []);

  const setName = useCallback((name) => setState((s) => ({ ...s, name })), []);

  const resetProfile = useCallback(() => {
    setState({ profileId: null, onboarded: false, a11y: DEFAULT_A11Y, name: state.name });
  }, [state.name]);

  const value = {
    profileId: state.profileId,
    profile,
    onboarded: state.onboarded,
    a11y: state.a11y,
    name: state.name,
    selectProfile,
    completeOnboarding,
    updateA11y,
    setName,
    resetProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

function mapDefaults(d) {
  return {
    fontScale: d.fontScale ?? 100,
    reduceMotion: !!d.reduceMotion,
    highContrast: !!d.highContrast,
    simplified: !!d.simplified,
    lowData: !!d.lowData,
  };
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
