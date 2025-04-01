"use client";
import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CoinType } from "@/mockData/courseData";
import ExchangeSection from "./ExchangeSection";

const Course: React.FC = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const exchangeRates: Record<CoinType, BigNumber> = {
    ETH: BigNumber.from("1000"), // 1 ETH = 1000 $YD
    BTC: BigNumber.from("20000"), // 1 BTC = 20000 $YD
    USDT: BigNumber.from("2"), // 1 USDT = 2 $YD
    BNB: BigNumber.from("500"), // 1 BNB = 500 $YD
  };

  // const handleAddToCart = (course: CartItem) => {
  //   setCartItems(prev => [...prev, course]);
  // };

  return (
    <>
      <ExchangeSection exchangeRates={exchangeRates} />
      {/* <CourseList onAddToCart={handleAddToCart} />
      <RightSidebar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <CartSidebar cartItems={cartItems} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> */}
    </>
  );
};

export default Course;
