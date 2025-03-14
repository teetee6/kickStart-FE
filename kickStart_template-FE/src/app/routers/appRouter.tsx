import {
  createHashRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from '@app/layout ';

// 페이지 컴포넌트 import
import { MainPage } from '@pages/main';

// RTK import
import store from '@app/store';

// 그 외 import
import { Fallback } from '@shared/ui/fallback';

// here: 전역 css 설정

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      handle={{ crumb: <Link to="/">Home</Link> }}
      errorElement={<Fallback />}
    >
      <Route index element={<MainPage />} />
    </Route>
  );

  const router = createHashRouter(routes);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
