import ThingItem from "./ThingItem";
import ThingMenu from "./ThingMenu";
import { useState } from "react";

const Thing = ({
  thing,
  prop_titleChange,
  prop_itemChange,
  prop_addItem,
  prop_deleteThing,
  prop_duplicateThing,
  thingCount,
}) => {
  const [menuPos, setMenuPos] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPos({ x: e.pageX, y: e.pageY });
  };

  const handleCloseMenu = () => {
    setMenuPos(null);
  };

  const handleDeleteThing = () => {
    console.log(`${thing.title}を削除`);
    prop_deleteThing(thing.id);
    setMenuPos(null);
  };

  const handleEditThing = () => {
    console.log(`${thing.title}を編集`);
    setMenuPos(null);
  };

  const handleDuplicateThing = () => {
    prop_duplicateThing(thing.id);
    setMenuPos(null);
  };

  return (
    <div
      className="w-full mb-8 last:mb-2"
      style={{
        border: menuPos ? "2px solid #ec27839a" : "2px solid #fff",
        transition: "0.3s",
      }}
    >
      <div className="bg-blue-100 p-2" onContextMenu={handleContextMenu}>
        <h2 className="text-2xl text-gray-400 pb-2">
          <input
            className="underline"
            type="text"
            value={thing.title}
            onChange={(e) => prop_titleChange(thing.id, e.target.value)}
          />
        </h2>
        <ul className="flex gap-2">
          {thing.items.map((item, index) => (
            <li key={item} className="text-sm">
              <ThingItem
                item={item}
                prop_onChange={(newItem) => {
                  prop_itemChange(newItem, index, thing);
                }}
              />
            </li>
          ))}
          <button
            className="text-gray-400 bold"
            onClick={() => {
              prop_addItem(thing);
            }}
          >
            ＋
          </button>
        </ul>
      </div>
      {menuPos && (
        <ThingMenu
          x={menuPos.x - 1}
          y={menuPos.y - 1}
          onClose={handleCloseMenu}
          deleteThing={handleDeleteThing}
          editThing={handleEditThing}
          duplicateThing={handleDuplicateThing}
          thingCount={thingCount}
        />
      )}
    </div>
  );
};

export default Thing;
