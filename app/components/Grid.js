import React from "react";

export function Grid({ children, columns }) {
  return (
    <div
      className="relative group"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}
