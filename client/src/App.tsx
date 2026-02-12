import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { CartProvider } from "@/providers/cart-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { TruckListProvider } from "@/providers/truck-list-provider";
import { ModeProvider } from "@/providers/mode-provider";
import MainMenu from "@/pages/main-menu";
import TechnicianView from "@/pages/technician-view";
import ManagerDashboard from "@/pages/manager-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/body-shop" component={TechnicianView} />
      <Route path="/manager" component={ManagerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { ErrorBoundary } from "@/components/ui/error-boundary";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <TruckListProvider>
              <ModeProvider>
                <CartProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Router />
                  </TooltipProvider>
                </CartProvider>
              </ModeProvider>
            </TruckListProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
