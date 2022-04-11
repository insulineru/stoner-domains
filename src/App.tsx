import React, { FC, useEffect, useState } from 'react'
import ApeImage from './assets/images/ape-transparent.png'

const DOMAIN_TLD = '.stoner'

export const App: FC = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [domain, setDomain] = useState('')
  const [record, setRecord] = useState('')

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

  const onMint = async (e: SubmitEvent) => {
    e.preventDefault()
    console.log('Minting', domain, record)
    return false
  }

  const renderNotConnectedContainer = () => (
    <>
      <h1 className="text-7xl font-black text-white max-w-lg">
        Hello, frens. Do you need a Stoner ENS?
      </h1>
      <button
        onClick={connectWallet}
        type="button"
        className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl px-8 py-4 w-full mt-6 font-bold"
      >
        Connect wallet
      </button>
    </>
  )

  const renderForm = () => (
    <form onSubmit={onMint}>
      <h1 className="text-7xl font-black text-white max-w-lg">
        Okey, let's build your domain!
      </h1>
      <div className="mt-8 flex rounded-md shadow-sm">
        <input
          type="text"
          className="flex-1 min-w-0 block rounded-l-md w-full px-3 py-2 bg-gray-700 text-white font-bold sm:text-sm"
          placeholder="Choose your domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <span className="inline-flex items-center px-3 bg-gray-800 text-white font-bold sm:text-sm rounded-none rounded-r-md">
          {DOMAIN_TLD}
        </span>
      </div>
      <input
        type="text"
        className="mt-4 flex-1 min-w-0 block rounded-md w-full px-3 py-2 bg-gray-700 text-white font-bold sm:text-sm"
        placeholder="What do you like? How about OG?"
        value={record}
        onChange={(e) => setRecord(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl px-8 py-4 w-full mt-6 font-bold"
      >
        Mint a domain
      </button>
    </form>
  )

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="absolute h-full w-full flex items-center justify-center bg-black">
      <img src={ApeImage} alt="Ape Logo" width="320" />
      <div className="ml-8">
        {currentAccount ? renderForm() : renderNotConnectedContainer()}
      </div>
    </div>
  )
}
