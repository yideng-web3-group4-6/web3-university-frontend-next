import GooeyNav from './GooeyNav';

export default function GooeyNavIndex() {
  return (
    <div>
      <GooeyNav
        animationTime={600}
        pCount={15}
        minDistance={20}
        maxDistance={42}
        maxRotate={75}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        timeVariance={300}
      />
    </div>
  );
}
