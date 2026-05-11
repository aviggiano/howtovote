const EXPLORER_BY_NETWORK_ID: Record<number, string> = {
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
  100: "https://gnosisscan.io",
  137: "https://polygonscan.com",
  42161: "https://arbiscan.io",
  8453: "https://basescan.org",
  11155111: "https://sepolia.etherscan.io",
};

function normalizeHex(value: string) {
  return value.trim().toLowerCase();
}

export function isEvmAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export function isTransactionHash(value: string) {
  return /^0x[a-fA-F0-9]{64}$/.test(value.trim());
}

export function getBlockExplorerBaseUrl(networkId = 1) {
  return EXPLORER_BY_NETWORK_ID[networkId] ?? null;
}

export function getAddressExplorerUrl(walletAddress: string, networkId = 1) {
  if (!isEvmAddress(walletAddress)) {
    return null;
  }

  const explorerBaseUrl = getBlockExplorerBaseUrl(networkId);

  if (!explorerBaseUrl) {
    return null;
  }

  return `${explorerBaseUrl}/address/${normalizeHex(walletAddress)}`;
}

export function getTransactionExplorerUrl(
  transactionHash: string,
  networkId = 1,
) {
  if (!isTransactionHash(transactionHash)) {
    return null;
  }

  const explorerBaseUrl = getBlockExplorerBaseUrl(networkId);

  if (!explorerBaseUrl) {
    return null;
  }

  return `${explorerBaseUrl}/tx/${normalizeHex(transactionHash)}`;
}
