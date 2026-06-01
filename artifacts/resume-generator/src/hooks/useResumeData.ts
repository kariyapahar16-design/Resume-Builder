import { useState, useEffect, useCallback } from "react";
import { ResumeData, defaultResumeData } from "@/types/resume";

const STORAGE_KEY = "resume_builder_data";

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load resume data from local storage", e);
    }
    return defaultResumeData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((newData: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setData((prev) => {
      if (typeof newData === "function") {
        return newData(prev);
      }
      return { ...prev, ...newData };
    });
  }, []);

  const clearData = useCallback(() => {
    setData(defaultResumeData);
  }, []);

  return {
    data,
    updateData,
    clearData,
  };
}
