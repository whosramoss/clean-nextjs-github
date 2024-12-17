import { ExampleProvider } from "src/shared/providers/ExampleProvider";
import { ThemeProvider } from "src/shared/providers/ThemeProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

export default async function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ExampleProvider>{children}</ExampleProvider>
    </ThemeProvider>
  );
}
