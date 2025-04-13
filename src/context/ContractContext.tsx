'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { YiDengToken__factory } from '@/typechain-types';
import { CourseMarket__factory } from '@/typechain-types';
import { useAccount } from 'wagmi';

const YIDENG_TOKEN_ADDRESS = '0xb26BA51DAcc2F8e59CB87ECCD2eC73a2C3540d6f';
const COURSE_MARKET_ADDRESS = '0x5DA45119233433327cD77D66EfCdA92edE57Ce78';

interface ContractContextType {
  ydContract: ethers.Contract | null;
  courseContract: ethers.Contract | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
}

const ContractContext = createContext<ContractContextType>({
  ydContract: null,
  courseContract: null,
  provider: null,
  signer: null,
});

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [ydContract, setYdContract] = useState<ethers.Contract | null>(null);
  const [courseContract, setCourseContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const { isConnected } = useAccount();

  useEffect(() => {
    const initContracts = async () => {
      if (window.ethereum && isConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const ydContract = YiDengToken__factory.connect(YIDENG_TOKEN_ADDRESS, signer);
        const courseContract = CourseMarket__factory.connect(COURSE_MARKET_ADDRESS, signer);

        setProvider(provider);
        setSigner(signer);
        setYdContract(ydContract);
        setCourseContract(courseContract);
      }
    };

    initContracts();
  }, [isConnected]);

  return (
    <ContractContext.Provider value={{ ydContract, courseContract, provider, signer }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
};
