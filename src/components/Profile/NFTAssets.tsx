import React from "react";

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
}

interface NFTAssetsProps {
  nfts: NFT[];
}

const NFTAssets: React.FC<NFTAssetsProps> = ({ nfts }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-cyber-blue mb-4">NFT 资产</h2>
      {nfts.length === 0 ? (
        <p className="text-gray-400">暂无 NFT 资产</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-dark-card p-4 rounded-xl shadow-neon hover:shadow-neon-lg transition-shadow"
            >
              <img src={nft.imageUrl} alt={nft.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold text-white mt-2">{nft.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTAssets;
