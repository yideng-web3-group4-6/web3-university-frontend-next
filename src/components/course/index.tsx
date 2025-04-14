import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Course } from '@/types/course/courseType';

import CourseList from './list';
import Filter from './filter';
import Info from './info';
import Footer from '../layout/footer';
import { useContracts } from '@/context/ContractContext';
import { useAccount } from 'wagmi';
import { useLoading } from '@/context/LoadingContext';
import { ethers } from 'ethers';

export default function Home({ courses }: { courses: Course[] }) {
  const { courseContract, ydContract } = useContracts();
  const { address, isConnected } = useAccount();
  const { showLoading, hideLoading } = useLoading();
  const [userCourses, setUserCourses] = useState<Record<string, boolean>>({});
  const [tokenBalance, setTokenBalance] = useState<string>('0');

  useEffect(() => {
    const initUserCourses = async () => {
      if (courseContract && address) {
        const coursesMap: Record<string, boolean> = {};
        for (const course of courses) {
          const id = await courseContract.web2ToCourseId(course.id);
          const hasCourse = await courseContract.userCourses(address, id);
          coursesMap[course.id] = hasCourse;
        }
        setUserCourses(coursesMap);
      }
    };

    initUserCourses();
  }, [courseContract, address, courses]);

  useEffect(() => {
    const getTokenBalance = async () => {
      if (ydContract && address) {
        try {
          const balance = await ydContract.balanceOf(address);
          setTokenBalance(balance.toString());
        } catch (error) {
          console.error('获取代币余额失败:', error);
          setTokenBalance('0');
        }
      }
    };

    getTokenBalance();
  }, [ydContract, address]);

  const handleBuyCourse = async (course: Course) => {
    if (!isConnected || !courseContract || !ydContract) {
      return;
    }
    if (userCourses[course.id]) {
      return;
    }

    const tokenBalanceNum = parseFloat(tokenBalance);
    const coursePriceNum = parseFloat(course.price.toString());

    if (tokenBalanceNum < coursePriceNum) {
      alert(
        `Insufficient token balance. Current balance: ${tokenBalance} YD, Course price: ${course.price} YD`,
      );
      return;
    }

    try {
      showLoading('Processing transaction...');
      const allowance = await ydContract.allowance(address, courseContract.address);
      const priceInWei = ethers.utils.parseEther(course.price.toString());
      if (allowance.lt(priceInWei)) {
        showLoading('Authorizing tokens...');
        const approveTx = await ydContract.approve(courseContract.address, priceInWei);
        await approveTx.wait();
      }

      showLoading('Purchasing course...');
      const tx = await courseContract.purchaseCourse(course.id);
      await tx.wait();
      setUserCourses(prev => ({ ...prev, [course.id]: true }));
      alert('Transaction completed');
    } catch (error) {
      console.error('Failed to purchase course:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <Box className='w-full pt-20 bg-black pb-0'>
      <Container maxWidth='lg'>
        <Info />
        <Filter />
        <CourseList
          courses={courses}
          userCourses={userCourses}
          tokenBalance={tokenBalance}
          onBuyCourse={handleBuyCourse}
        />
        <Footer />
      </Container>
    </Box>
  );
}
