const ThingItem = ({ item, index, prop_onChange, prop_contextMenu }) => {
  return (
    <input
      type="text"
      value={item}
      style={{ width: "20ch" }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(item);
        prop_contextMenu(index);
      }}
      onChange={(e) => {
        prop_onChange(e.target.value);
      }}
      placeholder="item"
    />
  );
};

export default ThingItem;
