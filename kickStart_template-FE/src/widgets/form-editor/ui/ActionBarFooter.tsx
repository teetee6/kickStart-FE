import {
  duplicateSection,
  removeSection,
  toggleRequired,
} from '@entities/form';
import { useAppDispatch } from '@shared/lib/store';
import { CopyButton, EtcButton, ToggleButton } from '@shared/ui/button';
import { TrashButton } from '@shared/ui/button/TrashButton';

interface ActionBarFooterProps {
  onCopy?: () => void;
  onDelete?: () => void;
  onToggleRequired?: (isRequired: boolean) => void;
  isRequired?: boolean;
  currentIndex: number;
}

const ActionBarFooter = ({
  onCopy,
  onDelete,
  isRequired = false,
  currentIndex,
}: ActionBarFooterProps) => {
  const dispatch = useAppDispatch();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(duplicateSection({ currentIndex }));
    onCopy?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(removeSection({ currentIndex }));
    onDelete?.();
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleRequired({ currentIndex }));
  };

  return (
    <div className="mt-4">
      <hr className="border-gray-200" />
      <div className="flex items-center justify-end py-2 gap-2">
        {/* 복사 버튼 */}
        <CopyButton onClick={handleCopy} />

        {/* 삭제 버튼 */}
        <TrashButton onClick={handleDelete} />

        {/* 구분선 */}
        <div
          className="h-6 w-px bg-gray-300 mx-2"
          role="separator"
          aria-hidden="true"
        />

        {/* 필수 토글 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">필수</span>
          <ToggleButton onClick={handleToggle} isRequired={isRequired} />
        </div>

        {/* 더보기 메뉴 */}
        <EtcButton />
      </div>
    </div>
  );
};

export { ActionBarFooter };
