import React from 'react';

export type AnimatedContextValue = {
  onExited: () => void;
  shouldHidePlaceholder: boolean;
};
const AnimatedContext = React.createContext<AnimatedContextValue>({
  onExited: () => {},
  shouldHidePlaceholder: false,
});

export default AnimatedContext;

export function useAnimatedContext() {
  return React.useContext(AnimatedContext);
}

export function AnimatedContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AnimatedContextValue;
}) {
  return (
    <AnimatedContext.Provider value={value}>
      {children}
    </AnimatedContext.Provider>
  );
}
