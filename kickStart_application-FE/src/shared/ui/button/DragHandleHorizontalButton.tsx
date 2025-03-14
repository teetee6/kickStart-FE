export function DragHandleHorizontalButton() {
  return (
    <button
      type="button"
      title="섹션 간 순서 재조정 드래그"
      className="h-8 px-3 hover:bg-gray-100 rounded-md cursor-move flex items-center"
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          <div className="w-1 h-1 rounded-full bg-gray-400" />
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          <div className="w-1 h-1 rounded-full bg-gray-400" />
        </div>
      </div>
    </button>
  );
}
