import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import GalleryPage from "@/pages/GalleryPage";
import MenuPage from "@/pages/MenuPage";
import WineListPage from "@/pages/WineListPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function LangGuard({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang as SupportedLanguage)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (!lang || !supportedLanguages.includes(lang as SupportedLanguage)) {
    return <Navigate to="/en" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route
            path="/:lang/*"
            element={
              <LangGuard>
                <MainLayout />
              </LangGuard>
            }
          >
            <Route index element={<Index />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="wine-list" element={<WineListPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
