"use client";
import React, { createContext, useContext, useState } from "react";

type ExampleContextTypes = {
  testValue: number;
  setTestValue: React.Dispatch<React.SetStateAction<number>>;
};

const ExampleContext = createContext<ExampleContextTypes | null>(null);

export const ExampleProvider = React.memo<{
  children: React.ReactNode;
}>((props) => {
  const { children } = props;

  const [testValue, setTestValue] = useState(0);

  return (
    <ExampleContext.Provider value={{ testValue, setTestValue }}>
      {children}
    </ExampleContext.Provider>
  );
});

export const useExampleContext = () => {
  const ctx = useContext(ExampleContext);
  if (!ctx) {
    throw new Error("useExampleContext must be used within a ExampleProvider");
  }
  return ctx;
};
