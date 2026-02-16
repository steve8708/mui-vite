export const getCrmSettings = () => {
  try {
    const stored = localStorage.getItem("crmSettings");
    if (!stored) {
      const defaults = { here: true };
      localStorage.setItem("crmSettings", JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(stored);
  } catch {
    return { here: true };
  }
};
