import { useLayoutEffect, useRef, useState } from "react";

const ThingItem = ({ item, index, prop_onChange, prop_contextMenu }) => {
  const [value, setValue] = useState(item);
  const [inputWidth, setInputWidth] = useState(1);
  const spanRef = useRef(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 2);
    }
  }, []); // 初回レンダー後に一度だけ実行

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateWidth();
    }
  };

  // 幅を計算して親に通知する共通関数
  const updateWidth = () => {
    const newWidth = Math.max(value.length * 2, 5);
    setInputWidth(newWidth);
    prop_onChange(value, index);
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          font: "inherit",
        }}
      >
        {value || " "}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={updateWidth} // フォーカスが外れたら幅を更新
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prop_contextMenu(index);
        }}
        style={{ width: `${inputWidth}px` }}
        placeholder="項目"
      />
    </div>
  );
};

export default ThingItem;
