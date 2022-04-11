import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  export interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}
export {}
