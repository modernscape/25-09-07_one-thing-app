import dummyThings from "../data/dummyThings";
import { useState } from "react";
import Thing from "./Thing";
import { useEffect } from "react";

const KEYS = {
  Things: "Things",
};

const ThingList = () => {
  const [things, setThings] = useState(() => {
    // 読み込み
    const thingsStored = localStorage.getItem(KEYS.Things);
    return JSON.parse(thingsStored) ?? dummyThings;
  });

  // 保存
  useEffect(() => localStorage.setItem(KEYS.Things, JSON.stringify(things)));

  const handleTitleChange = (thingId, newTitle) => {
    setThings((prevThings) => {
      return prevThings.map((thing) =>
        thing.id === thingId ? { ...thing, title: newTitle } : thing,
      );
    });
  };

  const handleItemChange = (newItem, i, thing) => {
    let newItems = [...thing.items];
    newItems[i] = newItem;
    setThings((prevThings) => {
      return prevThings.map((prev) =>
        prev.id === thing.id ? { ...prev, items: newItems } : prev,
      );
    });
  };

  const handleAddThingItem = (thingID) => {
    setThings((prev) =>
      prev.map((t) => {
        if (t.id === thingID) {
          const newItem = "";
          const items = [...t.items, newItem];
          return { ...t, items: items };
        } else {
          return t;
        }
      }),
    );
  };

  const deleteThing = (thingId) =>
    setThings((prev) => prev.filter((t) => thingId !== t.id));

  const addThing = () => {
    const newThing = {
      id: crypto.randomUUID(),
      title: "タイトル",
      items: ["アイテム"],
    };
    setThings([...things, newThing]);
  };

  const duplicateThing = (thingId) => {
    setThings((prev) =>
      prev.flatMap((t) =>
        t.id === thingId
          ? [t, { ...t, id: crypto.randomUUID(), title: t.title + "のコピー" }]
          : t,
      ),
    );
  };

  const deleteItem = (thingID, itemIndex) => {
    setThings((prev) =>
      prev.map((t) =>
        t.id === thingID
          ? {
              ...t,
              items: t.items.filter((_, i) => i !== itemIndex),
            }
          : t,
      ),
    );
  };

  return (
    <div>
      <div className="p-4">
        {things.map((thing) => {
          return (
            <Thing
              key={thing.id}
              thing={thing}
              prop_titleChange={handleTitleChange}
              prop_itemChange={handleItemChange}
              prop_addItem={handleAddThingItem}
              prop_deleteThing={deleteThing}
              prop_duplicateThing={duplicateThing}
              thingCount={things.length}
              prop_itemDelete={deleteItem}
            />
          );
        })}
      </div>
      {things.length < 4 && (
        <div className="text-center text-4xl !normal">
          <button onClick={addThing}>+</button>
        </div>
      )}
    </div>
  );
};

export default ThingList;
