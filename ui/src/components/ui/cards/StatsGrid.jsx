import React from "react";

import StatsCard from "./StatsCard";

const StatsGrid = ({ items = [], columns = 4 }) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        gridCols[columns] || "md:grid-cols-4"
      }`}
    >
      {items.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
