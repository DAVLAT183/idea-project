import GameBoard from '@/components/Focusshift/GameBoard'
import TicTacToeBoard from '@/components/TicTacToe/TicTacToeBoard'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <TicTacToeBoard />
      <Link href="/" className="text-blue-400 mt-4 underline">
        ⬅ Назад
      </Link>
    </div>
  )
}

export default page