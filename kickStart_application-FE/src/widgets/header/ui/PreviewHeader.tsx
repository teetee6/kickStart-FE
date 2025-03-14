import { BackButton } from '@shared/ui/button/BackButton';
import { useNavigate } from 'react-router';

export const PreviewHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="max-w-[900px] mx-auto px-4 h-14 flex items-center">
        <div className="flex items-center text-gray-600">
          <BackButton onClick={() => navigate('/')} />
          <span className="ml-2 text-sm font-medium">미리보기 모드</span>
        </div>
      </div>
    </header>
  );
};
