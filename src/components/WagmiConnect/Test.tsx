"use client";
import { useState } from "react";

export const TestSignature = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [signature, setSignature] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("获取账户成功:", accs);
        setAccounts(accs);
      } catch (error) {
        console.error("连接失败:", error);
      }
    } else {
      console.log("MetaMask 未安装");
    }
  };

  const signMessage = async () => {
    if (window.ethereum && accounts.length > 0) {
      try {
        console.log("开始签名，账户:", accounts[0]);
        const sig = await window.ethereum.request({
          method: "personal_sign",
          params: ["测试签名消息", accounts[0]],
        });
        console.log("签名成功:", sig);
        setSignature(sig);
      } catch (error) {
        console.error("签名失败:", error);
      }
    } else {
      console.log("请先连接钱包");
    }
  };

  return (
    <div>
      <button onClick={connectWallet} disabled={accounts.length > 0}>
        连接钱包
      </button>
      <button onClick={signMessage} disabled={accounts.length === 0}>
        签名
      </button>
      {signature && <p>签名结果: {signature}</p>}
    </div>
  );
};
