import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    ym?: any;
  }
}

export function useMetrika() {
  const location = useLocation();

  useEffect(() => {
  }, [location]);
}