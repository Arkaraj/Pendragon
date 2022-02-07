import { useEffect, useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from "react-moralis";

export const useNFTTokenIds = (addr) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralis();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const {
    fetch: getNativeTransations,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
    chain: chainId,
    address: addr,
    limit: 100,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (data?.result) {
      const NFTs = data.result;
      setTotalNFTs(data.total);
      setFetchSuccess(true);
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image = resolveLink(NFT.metadata?.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(NFT.token_uri)
              .then((response) => response.json())
              .then((data) => {
                NFT.image = resolveLink(data.image);
              });
          } catch (error) {
            setFetchSuccess(false);
          }
        }
      }
      setNFTTokenIds(NFTs);
    }
  }, [data]);

  return {
    getNativeTransations,
    NFTTokenIds,
    chainId,
    error,
    isLoading,
  };
};

// export default useNFTTokenIds;
