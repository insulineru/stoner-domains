import React, { FC, useEffect, useState } from 'react'
import ApeImage from './assets/images/ape-transparent.png'
export const App: FC = () => {
  const [, setCurrentAccount] = useState('')

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) return

      console.log('We have the ethereum object', ethereum)

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (!accounts) return

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) return

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (!accounts) return

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      type="button"
      className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl px-8 py-4 w-full mt-6 font-bold"
    >
      Connect wallet
    </button>
  )

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="absolute h-full w-full flex items-center justify-center bg-black">
      <img src={ApeImage} alt="Ape Logo" width="320" />
      <div className="ml-8">
        <h1 className="text-7xl font-black text-white max-w-lg">
          Hello, frens. Do you need a Stoner ENS?
        </h1>
        {renderNotConnectedContainer()}
      </div>
    </div>
  )
}
