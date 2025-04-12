import HomeContent from '@/components/home/index';
import { SparklesCore } from '@/components/ui/sparkles';
const Home = () => {
  return (
    <main className='min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden'>
      {/* Ambient background with moving particles */}
      <div className='h-full w-full absolute inset-0 z-0'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full'
          particleColor='#FFFFFF'
        />
      </div>

      <div className='relative z-10'>
        <HomeContent />
      </div>
    </main>
  );
};

export default Home;
