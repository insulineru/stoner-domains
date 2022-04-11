import { ethers } from 'ethers'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import ApeImage from './assets/images/ape-transparent.png'
import { Domains__factory } from './types/factories/Domains__factory'

const DOMAIN_TLD = '.stoner'
const CONTRACT_ADDRESS = '0x0ebd3fda2e512606a1f4fb2cff8ab888fae3c85b'

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

  const onMint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!domain || !record) return

    const price =
      domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1'
    console.log('Minting domain', domain, 'with price', price)

    try {
      const { ethereum } = window
      if (!ethereum) return

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = Domains__factory.connect(CONTRACT_ADDRESS, signer)

      let tx = await contract.register(domain, {
        value: ethers.utils.parseEther(price),
      })
      const receipt = await tx.wait()

      if (receipt.status === 1) {
        console.log(
          `Domain minted! https://mumbai.polygonscan.com/tx/${tx.hash}`,
        )

        tx = await contract.setRecord(domain, record)
        await tx.wait()
        console.log(`Record set! https://mumbai.polygonscan.com/tx/${tx.hash}`)

        setRecord('')
        setDomain('')
      } else {
        alert('Transaction is failed. Please, try again') // todo: Use toasts
      }
    } catch (e) {
      console.log(e)
    }
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
    <form onSubmit={(e) => onMint(e)}>
      <h1 className="text-7xl font-black text-white max-w-lg">
        Okey, let's build your domain!
      </h1>
      <div className="mt-8 flex rounded-md shadow-sm">
        {/* TODO: Add validate rules (min 3 length) */}
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
