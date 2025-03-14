import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
// import { Footer } from '@widgets/footer';
import { PreviewHeader } from '@widgets/header';

export const HEADER_HEIGHT = 60; // 헤더 대략 높이

export const Layout = () => {
  const location = useLocation();
  const isPreviewPage = location.pathname === '/preview';

  return (
    <div className="layout layout__wrapper bg-[--primary-bg]">
      {isPreviewPage && <PreviewHeader />}

      <main className="layout__content max-w-[900px] w-full mx-auto px-4 transition-all duration-300">
        <Outlet />
      </main>

      {/* <Footer /> */}

      <ScrollRestoration />
      {/* Toast 설정 */}
    </div>
  );
};
