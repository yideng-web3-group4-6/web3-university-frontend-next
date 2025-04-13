import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useContracts } from '@/context/ContractContext';
import Link from 'next/link';
import { useLoading } from '@/context/LoadingContext';
import { Course } from '@/types/course/courseType';

import './style.css';

interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const { address, isConnected } = useAccount();
  const { courseContract, ydContract } = useContracts();
  const [web3CourseId, setWeb3CourseId] = useState<string>('');
  const [hasCourse, setHasCourse] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const { showLoading, hideLoading } = useLoading();

  const showToast = (
    title: string,
    description: string,
    variant: 'default' | 'destructive' = 'default',
  ) => {
    const event = new CustomEvent('show-toast', {
      detail: { title, description, variant },
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const initCourseData = async () => {
      if (courseContract && address) {
        const id = await courseContract.web2ToCourseId(course.id);
        setWeb3CourseId(id);
        const hasCourse = await courseContract.userCourses(address, id);
        console.log('hasCourse', hasCourse);
        setHasCourse(hasCourse);
      }
    };

    initCourseData();
  }, [courseContract, address, course.id]);

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

  const handleBuyCourse = async () => {
    if (!isConnected || !courseContract || !ydContract) {
      return;
    }
    if (hasCourse) {
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
      setHasCourse(true);
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
    <div className='course-item cursor-pointer'>
      <div className='course-info'>
        <img src={course.coverImage || '/static/course/course-1.png'} alt='Course Image' />
        <div className='course-title'>
          <h2 className='pb-2 pt-2'>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      </div>
      <div className='course-content'>
        <ul className='course-listing'>
          <li className='flex justify-between'>
            <p>Category</p>
            <p>{course.level}</p>
          </li>
          <li className='flex justify-between'>
            <p className='font-bolder'>Price</p>
            <p>{course.price} YD</p>
          </li>
          {isConnected && (
            <li className='flex justify-between'>
              <p>Your Balance</p>
              <p>{tokenBalance} YD</p>
            </li>
          )}
        </ul>
      </div>
      {isConnected && (
        <div className='actions-btn'>
          <button>Like</button>
          {!hasCourse ? (
            <button onClick={handleBuyCourse}>Buy Now</button>
          ) : (
            <Link href={`/course/${course.id}`}>
              <button>View Course</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseItem;
