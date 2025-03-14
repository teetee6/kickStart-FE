import {
  createHashRouter,
  createRoutesFromElements,
  Link,
  LoaderFunction,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from '@app/layout ';

// 페이지 컴포넌트 import
import { FormEditPage } from '@pages/form-edit';
import { FormPreviewPage } from '@pages/form-preview';
import { FormResultPage } from '@pages/form-result/ui/FormResultPage';

// RTK import
import store from '@app/store';
import { clearAnswers } from '@entities/form';

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
      <Route index element={<FormEditPage />} />
      <Route
        path="preview"
        element={<FormPreviewPage />}
        loader={previewLoader}
      />
      <Route path="result" element={<FormResultPage />} />
    </Route>
  );

  const router = createHashRouter(routes);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

const previewLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const from = url.searchParams.get('from');

  if (from === 'edit') {
    store.dispatch(clearAnswers());
  }

  return null;
};
