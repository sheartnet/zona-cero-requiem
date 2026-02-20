import { useCallback, useEffect, useState } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import LoadingScreen from '@/components/LoadingScreen';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children }) => Layout ?
  <Layout>{children}</Layout>
  : <>{children}</>;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const RoutedApp = () => {
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [areHeroAssetsReady, setAreHeroAssetsReady] = useState(false);

  useEffect(() => {
    const preloadImage = (src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = src;
    });

    Promise.all([
      preloadImage('/images/hero_bg.png'),
      preloadImage('/images/logo-hero.png'),
    ]).finally(() => {
      setAreHeroAssetsReady(true);
    });
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsTimerDone(true);
  }, []);

  const isLoading = !isTimerDone || !areHeroAssetsReady;

  return (
    <QueryClientProvider client={queryClientInstance}>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Router>
            <ScrollToTop />
            <RoutedApp />
          </Router>
          <Toaster />
        </>
      )}
    </QueryClientProvider>
  )
}

export default App
