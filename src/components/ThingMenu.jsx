import { Trash2, Edit, Copy } from "lucide-react";
import { cva } from "class-variance-authority";

const ThingMenu = ({
  x,
  y,
  onClose,
  deleteThing,
  editThing,
  duplicateThing,
  thingCount,
}) => {
  const btn = cva(
    "hover:bg-gray-800 hover:text-white px-3 py-1 flex items-center gap-1 rounded w-full",
    {},
  );

  return (
    <div
      className="flex flex-col gap-1 rounded bg-slate-100 inline-block text-sm z-1 p-1 opacity-90 shadow"
      onMouseLeave={onClose}
      style={{
        position: "absolute",
        top: y,
        left: x,
        border: "none",
      }}
    >
      <button type="button" className={btn()} onClick={editThing}>
        <Edit className="w-4 h-4" />
        <span className="">編集</span>
      </button>
      {thingCount <= 4 && (
        <button type="button" className={btn()} onClick={duplicateThing}>
          <Copy className="w-4 h-4" />
          <span className="">複製</span>
        </button>
      )}
      <button type="button" className={btn()} onClick={deleteThing}>
        <Trash2 className="w-4 h-4" />
        <span className="">削除</span>
      </button>
    </div>
  );
};

export default ThingMenu;
