import React, { useState } from 'react'

const easeInCirc = (x: number): number => {
  return 1 - Math.sqrt(1 - Math.pow(x, 2))
}

const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const orders = [0, 1, 2, 3, 7, 11, 10, 9, 8, 4]

// ----------

const DrawingGame = () => {
  const [highlightId, setHighlightId] = useState(-1)

  const handleStart = () => {
    if (highlightId !== -1) {
      return
    }

    // 最後多跳的次數
    const R = Math.floor(Math.random() * 3)

    // 獎品的 index
    const finalPrizeId = Math.round((Math.random() * 10000) % ids.length)

    // 次數
    const count = ids.length * 3 + finalPrizeId - R

    // 時間
    const K = count * 150

    // Highlight
    for (let i = 0; i <= count; ++i) {
      setTimeout(
        () => {
          setHighlightId(i % ids.length)
        },
        K * easeInCirc(i / count),
      )
    }

    const lastInterval = K * (1 - easeInCirc((count - 1) / count))

    // 最後多跳的 highlight
    for (let i = 1; i <= R; ++i) {
      setTimeout(
        () => {
          setHighlightId((count + i) % 10)
        },
        K + i * lastInterval,
      )
    }

    // reset and alert
    setTimeout(
      () => {
        setHighlightId(-1)
        alert(`Congrat! You got the prize ${finalPrizeId} !👏`)
      },
      K + (R + 1) * lastInterval,
    )
  }

  return (
    <div className="mx-auto grid max-w-screen-sm grid-cols-4 grid-rows-3 gap-4">
      {ids.map((i) => (
        <div
          className={`flex aspect-square w-full items-center justify-center rounded-2xl bg-lime-300 text-3xl  transition-transform duration-75 ${
            i === highlightId && 'scale-110 bg-lime-200'
          }`}
          style={{ order: orders[i] }}
        >
          {i}
        </div>
      ))}

      <div
        className="order-4 col-span-2 flex cursor-pointer items-center justify-center rounded-2xl bg-pink-400 font-bold text-white transition duration-75 hover:scale-105"
        onClick={handleStart}
      >
        START
      </div>
    </div>
  )
}

export default DrawingGame
