import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import DailyPlanner from './pages/DailyPlanner';
import ProjectTracker from './pages/ProjectTracker';
import MockTestTracker from './pages/MockTestTracker';
import ProgressTracking from './pages/ProgressTracking';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeline',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <Timeline />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const plannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/planner',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <DailyPlanner />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <ProjectTracker />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const testsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tests',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <MockTestTracker />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: () => (
    <ProtectedRoute>
      <MainLayout>
        <ProgressTracking />
      </MainLayout>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  timelineRoute,
  plannerRoute,
  projectsRoute,
  testsRoute,
  progressRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" message="Initializing..." />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default function AppWrapper() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  );
}
