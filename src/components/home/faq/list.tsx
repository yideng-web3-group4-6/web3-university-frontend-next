import React from "react";

import FAQItem from "./item";

const faqs = [
  {
    question: "What TLDs do Namefi support and do they support all names?",
    answer:
      "Currently Namefi supports 329 TLDs. In rare cases, some domain names are marked special or premium by its TLD registries and Namefi can’t support them yet. Namefi is working on expanding our TLD coverage.",
  },
  {
    question:
      "Does Namefi support ENS, Handshake, Unstoppable Domain, and other web3 names?",
    answer: "This section is coming soon!", // 假设答案待补充
  },
  {
    question:
      "Does Namefi support ENS, Handshake, Unstoppable Domain, and other web3 names?",
    answer: "This section is coming soon!", // 假设答案待补充
  },
  {
    question:
      "Does Namefi support ENS, Handshake, Unstoppable Domain, and other web3 names?",
    answer: "This section is coming soon!", // 假设答案待补充
  },
  {
    question:
      "Does Namefi support ENS, Handshake, Unstoppable Domain, and other web3 names?",
    answer: "This section is coming soon!", // 假设答案待补充
  },
];

const FAQList: React.FC = () => {
  return (
    <div className="mt-4">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQList;