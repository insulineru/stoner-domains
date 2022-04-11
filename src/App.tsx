import React, { FC } from 'react'
import ApeImage from './assets/images/ape-transparent.png'
const App: FC = () => {
  return (
    <div className="absolute h-full w-full flex items-center justify-center bg-black">
      <img src={ApeImage} alt="Ape Logo" width="320" />
      <h1 className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Hello, frens
      </h1>
    </div>
  )
}

export default App
