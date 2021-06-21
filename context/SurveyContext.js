import { createContext, useContext } from "react";

const SurveyContext = createContext();

export function SurveyWrapper({ children }) {
  let sharedState = "";

  return (
    <SurveyContext.Provider value={sharedState}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveyContext() {
  return useContext(SurveyContext);
}
