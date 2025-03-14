export function DragHandleVerticalButton() {
  return (
    <button
      type="button"
      title="옵션 순서 재조정 드래그"
      className="w-8 h-8 hover:bg-gray-100 rounded-md cursor-move flex items-center justify-center"
    >
      <div className="flex gap-0.5">
        <div className="text-gray-400 select-none text-lg">:</div>
        <div className="text-gray-400 select-none text-lg">:</div>
      </div>
    </button>
  );
}
