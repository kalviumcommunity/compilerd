export const saveToLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

export const loadFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Special handling for language object
        if (key === "language" && typeof parsed === "object") {
          return parsed;
        }
        return parsed;
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }
  return null;
};
