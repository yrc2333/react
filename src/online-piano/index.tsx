import { useEffect, useMemo, useState } from 'react'

function App() {
  const keys: Record<string, { frequency: number }> = {
    A: {
      frequency: 196,
    },
    S: {
      frequency: 220,
    },
    D: {
      frequency: 246,
    },
    F: {
      frequency: 261,
    },
    G: {
      frequency: 293,
    },
    H: {
      frequency: 329,
    },
    J: {
      frequency: 349,
    },
    K: {
      frequency: 392,
    },
  }

  const context = useMemo(() => {
    return new AudioContext()
  }, [])

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTimeouts, setCurrentTimeouts] = useState<ReturnType<typeof setTimeout>[]>([])
  const pressedKeys = useMemo(() => new Set<string>(), [])

  const playNote = (key: string) => {
    const frequency = keys[key]?.frequency
    if (!frequency) return

    const osc = context.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = frequency

    const gain = context.createGain()
    osc.connect(gain)
    gain.connect(context.destination)

    // 简单的音量包络：快速上升，然后指数衰减
    const now = context.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.3, now + 0.01)

    osc.start(now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1)
    osc.stop(now + 1)

    // 视觉反馈
    document.getElementById(`key-${key}`)?.classList.add('pressed')
    setTimeout(() => {
      document.getElementById(`key-${key}`)?.classList.remove('pressed')
    }, 100)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      if (!keys[key] || pressedKeys.has(key)) return

      pressedKeys.add(key)
      playNote(key)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      pressedKeys.delete(key)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [pressedKeys])

  const map: Record<number, string> = {
    1: 'A',
    2: 'S',
    3: 'D',
    4: 'F',
    5: 'G',
    6: 'H',
    7: 'J',
    8: 'K',
  }

  function playMusic(music: number[][]) {
    // 如果正在播放，先停止当前的
    if (isPlaying) {
      currentTimeouts.forEach(clearTimeout)
      setCurrentTimeouts([])
    }

    setIsPlaying(true)
    setProgress(0)

    const totalDuration = music.reduce((sum, item) => sum + item[1], 0)
    let startTime = 0
    let completed = 0
    const timeouts: ReturnType<typeof setTimeout>[] = []

    music.forEach((item, index) => {
      const playTimeout = setTimeout(() => {
        playNote(map[item[0]])
        completed += item[1]
        setProgress((completed / totalDuration) * 100)

        if (index === music.length - 1) {
          const finalTimeout = setTimeout(() => {
            setIsPlaying(false)
            setProgress(0)
            setCurrentTimeouts([])
          }, item[1] * 0.5)
          timeouts.push(finalTimeout)
        }
      }, startTime * 0.5)
      timeouts.push(playTimeout)
      startTime += item[1]
    })

    // 设置超时清理
    const finishTimeout = setTimeout(() => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTimeouts([])
    }, totalDuration * 0.5 + 1000)
    timeouts.push(finishTimeout)

    setCurrentTimeouts(timeouts)
  }

  function playSong2() {
    const music = [
      [6, 1000],
      [6, 1000],
      [6, 1000],
      [3, 500],
      [6, 500],
      [5, 1000],
      [3, 500],
      [2, 500],
      [3, 1000],
    ]

    playMusic(music)
  }

  function playSong1() {
    const music = [
      [6, 1000],
      [5, 1000],
      [3, 1000],
      [5, 1000],
      [8, 1000],
      [6, 500],
      [5, 500],
      [6, 1000],
    ]

    playMusic(music)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-96">
          {Object.keys(keys).map((item: any) => {
            return (
              <div
                key={item}
                className="flex-1 border-2 border-gray-950 bg-gray-100 cursor-pointer transition-all duration-100 hover:bg-gray-400 group">
                <div
                  onClick={() => playNote(item)}
                  id={`key-${item}`}
                  className="h-full flex items-end justify-center pb-8">
                  <span className="text-4xl font-bold text-gray-700 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {isPlaying && (
        <div className="max-w-4xl mx-auto mt-6">
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all ease-out"
              style={{
                width: `${progress}%`,
                transitionDuration: '300ms',
              }}
            />
          </div>
          <p className="text-center text-gray-300 mt-2 font-medium">
            播放中... {Math.round(progress)}%
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => playSong1()}
          className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 font-semibold">
          世上只有妈妈好
        </button>
        <button
          onClick={() => playSong2()}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 font-semibold">
          奢香夫人
        </button>
      </div>
    </div>
  )
}

export default App
