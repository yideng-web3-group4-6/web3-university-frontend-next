import React from "react";
import { Box } from "@mui/material";

import CourseItem from "./item";

const data = [
  {
    image: "/images/cyber-city.jpg",
    title: "Cyber City Clan",
    price: "PRICE (GAC) = 0.59 BUSD",
    endTime: "2025-04-09T14:05:00", // 示例时间
    minAllocation: "TBA",
    maxAllocation: "900.00 BUSD",
    targetedRaise: "200,000 BUSD",
    accessType: "Public",
    chainIcon: "/images/chain-icon-1.png", // 示例图标
  },
  {
    image: "/images/space-xy.jpg",
    title: "The Space XY",
    price: "PRICE (XYZ) = 0.99 BUSD",
    endTime: "2025-04-09T10:15:00",
    minAllocation: "0.33 BUSD",
    maxAllocation: "580.00 BUSD",
    targetedRaise: "3,800,000 BUSD",
    accessType: "Private",
    chainIcon: "/images/chain-icon-2.png",
  },
  {
    image: "/images/kingdomx.jpg",
    title: "KingdomX",
    price: "PRICE (KTC) = 0.45 BUSD",
    endTime: "2025-04-10T22:42:00",
    minAllocation: "TBA",
    maxAllocation: "TBA",
    targetedRaise: "48,000 BUSD",
    accessType: "Community",
    chainIcon: "/images/chain-icon-3.png",
  },
];

const CourseList = () => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseItem key={index} />
      ))}
    </Box>
  );
};

export default CourseList;