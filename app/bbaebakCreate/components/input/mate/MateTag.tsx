interface Props {
  name: string;
  onRemove: () => void;
}

function MateTag({ name, onRemove }: Props) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
      <span>{name}</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-gray-600">
        ×
      </button>
    </div>
  );
}

export default MateTag;
