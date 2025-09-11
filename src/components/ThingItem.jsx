const ThingItem = ({ item, prop_onChange }) => {
  return (
    <input
      type="text"
      value={item}
      style={{ width: "20ch" }}
      onChange={(e) => {
        prop_onChange(e.target.value);
      }}
      placeholder="item"
    />
  );
};

export default ThingItem;
