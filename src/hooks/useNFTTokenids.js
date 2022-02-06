import { useEffect, useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from "react-moralis";

const useNFTTokenIds = (options) => {
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
    address: "0xd28bfaea8c886ff6424141278a928f3cde2741f1",
    ...options,
  });

  useEffect(() => data && setNFTTokenIds(data?.result), [data]);

  return {
    getNativeTransations,
    NFTTokenIds,
    chainId,
    error,
    isLoading,
  };
};

export default useNFTTokenIds;
