const users = [
  {
    id: 1,
    walletAddress: "0x1234567890abcdef",
    role: "admin",
    nickname: "AdminUser",
    avatarUrl:
      "	https://cdn.nlark.com/yuque/0/2023/png/anonymous/1…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
  {
    id: 2,
    walletAddress: "0x9876543210fedcba",
    role: "teacher",
    nickname: "TeacherUser",
    avatarUrl:
      "https://cdn.nlark.com/yuque/0/2025/png/26589314/17…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
  {
    id: 3,
    walletAddress: "0x1122334455667788",
    role: "user",
    nickname: "RegularUser1",
    avatarUrl:
      "https://cdn.nlark.com/yuque/0/2023/jpeg/22957760/1…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
  {
    id: 4,
    walletAddress: "0x8877665544332211",
    role: "user",
    nickname: "RegularUser2",
    avatarUrl:
      "https://cdn.nlark.com/yuque/0/2023/png/34713865/16…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
  {
    id: 5,
    walletAddress: "0x556677889900aabb",
    role: "user",
    nickname: "RegularUser3",
    avatarUrl:
      "https://cdn.nlark.com/yuque/0/2023/png/34713865/16…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
  {
    id: 6,
    walletAddress: "0x1122334455667788",
    role: "user",
    nickname: "RegularUser4",
    avatarUrl:
      "https://cdn.nlark.com/yuque/0/2023/png/34713865/16…ge%2Fresize%2Cm_fill%2Cw_56%2Ch_56%2Fformat%2Cpng",
  },
];

export const articles = [
  {
    id: 101,
    title: "TypeScript Basics",
    content:
      "This article covers the fundamentals of TypeScript, including types, interfaces, and classes.",
    slug: "typescript-basics",
    metaTitle: "Learn TypeScript",
    metaDescription: "Get started with TypeScript programming",
    status: "published",
    lastModified: "2024-04-12T14:18:36",
    author: users[0], // AdminUser
    likedBy: [users[1], users[2]], // TeacherUser and RegularUser1
    favoritedBy: [users[3]], // RegularUser2
  },
  {
    id: 102,
    title: "Node.js for Beginners",
    content:
      "An introduction to Node.js, covering installation, basic syntax, and creating a simple server.",
    slug: "nodejs-for-beginners",
    metaTitle: "Node.js Guide",
    metaDescription: "Learn how to use Node.js",
    status: "published",
    lastModified: "2024-04-12T14:18:36",
    author: users[1], // TeacherUser
    likedBy: [users[0], users[3]], // AdminUser and RegularUser2
    favoritedBy: [users[2], users[4]], // RegularUser1 and RegularUser3
  },
  {
    id: 103,
    title: "Understanding React Hooks",
    content:
      "A deep dive into React Hooks, including useState, useEffect, and custom hooks.",
    slug: "react-hooks",
    metaTitle: "React Hooks Explained",
    metaDescription: "Master React Hooks in this article",
    status: "published",
    lastModified: "2024-04-12T14:18:36",
    author: users[2], // RegularUser1
    likedBy: [users[0], users[4]], // AdminUser and RegularUser3
    favoritedBy: [users[1], users[5]], // TeacherUser and RegularUser4
  },
  {
    id: 104,
    title:
      "Advanced JavaScript Concepts（Yxnne new article and worse to be deleted）",
    content:
      "Explore advanced JavaScript topics like closures, prototypes, and asynchronous programming.",
    slug: "advanced-js",
    metaTitle: "Advanced JavaScript",
    metaDescription: "Take your JavaScript skills to the next level",
    status: "published",
    lastModified: "2024-04-12T14:18:36",
    author: users[3], // RegularUser2
    likedBy: [users[2], users[5]], // RegularUser1 and RegularUser4
    favoritedBy: [users[0], users[1]], // AdminUser and TeacherUser
  },
  {
    id: 105,
    title: "Building RESTful APIs with Express",
    content:
      "Learn how to build RESTful APIs using the Express framework in Node.js.",
    slug: "express-rest-api",
    metaTitle: "Express REST API",
    metaDescription: "Create RESTful APIs with Express",
    status: "published",
    author: users[4], // RegularUser3
    likedBy: [users[3], users[0]], // RegularUser2 and AdminUser
    favoritedBy: [users[2], users[1]], // RegularUser1 and TeacherUser
  },
  {
    id: 106,
    title: "Introduction to MongoDB",
    content:
      "An introduction to MongoDB, a NoSQL database, covering basic operations and data modeling.",
    slug: "mongodb-intro",
    metaTitle: "MongoDB Basics",
    metaDescription: "Get started with MongoDB",
    status: "published",
    author: users[5], // RegularUser4
    likedBy: [users[4], users[1]], // RegularUser3 and TeacherUser
    favoritedBy: [users[0], users[3]], // AdminUser and RegularUser2
  },
];
