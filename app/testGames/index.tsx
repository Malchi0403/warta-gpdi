import React ,{ useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Layer {
  img: HTMLImageElement
  fill: CanvasPattern | undefined
  x: number
  y: number
  width: number
  height: number
  tl?: gsap.core.Timeline
}

export default function GameComponent(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cw: number, ch: number
    const bg: Layer[] = []
    const fg = { img: new Image(), x: 0, top: 540 }
    const dino = { img: new Image(), spriteOffsetX: 0, x: 0, top: 402 }
    const eyeLid = { img: new Image(), spriteOffsetX: 0 }
    const dinoJump = { img: new Image(), spriteOffsetX: 0, show: false }
    const dinoJumpGlow = { img: new Image(), spriteOffsetX: 0, show: false }
    const dust1 = { img: new Image(), spriteOffsetX: 0, x: 0, y: 0 }
    const dust2 = { img: new Image(), spriteOffsetX: 0, x: 0, y: 0 }
    const coin = { img: new Image(), spriteOffsetX: 0, top: 265, right: 250, show: true }
    const den = { img: new Image(), spriteOffsetX: 0, top: 265, right: 450 , show: true }
let currentDinoX = 0; 
    // const handleMouseMove = (e: MouseEvent) : void => {
    //   gsap.to(dino, { duration: 2, x: e.clientX - 250, overwrite: 'auto' })
    // }
    const handleKeyboardMove = (e: KeyboardEvent) : void => {
      const step = 50; 
       if (e.key === 'ArrowLeft') {
    currentDinoX -= step;
  } else if (e.key === 'ArrowRight') {
    currentDinoX += step;
  } else {
    return; // ignore key lain
  }

  gsap.to(dino, { duration: 0.3, x: currentDinoX, overwrite: 'auto' });
    }

    const handleJump = () : void => {
      if (dinoJump.show) return
      dinoJump.show = true

      gsap.timeline({ onComplete: () => { dinoJump.show = false } })
        .fromTo(dinoJump, { spriteOffsetX: 0 }, { duration: 0.5, spriteOffsetX: 1250    , ease: 'steps(5)' })
        .call(() => {
          if (cw - dino.x < 475 && cw - dino.x > 325) {
            coin.show = false
            den.show = false
            gsap.to(dinoJumpGlow, { duration: 0.3, spriteOffsetX: 750, ease: 'steps(3)' })
          }
        }, [], 0.25)
    }

    const handleKeyDown = (e: KeyboardEvent) : void => {
      if (e.keyCode === 32) {
        e.preventDefault()
        handleJump()
      }
    }

  const makeLayer = (e: Event) : void => {
  const target = e.currentTarget as HTMLImageElement
  const layer: Layer = {
    img: target,
    fill: ctx?.createPattern(target, 'repeat') ?? undefined  ,
    x: 0,
    y: [55, 55, 55, 0, 525][Number(target.id)],
    width: target.width,
    height: target.height
  }
  bg.push(layer)
  layer.tl = gsap.timeline({ repeat: -1 }).to(layer, { x: -target.width, ease: 'none', duration: 6 - Number(target.id) })

  bg.sort((a, b) => (a.img.id > b.img.id) ? 1 : -1)
}

    const moveFg = () : void => {
      if (gsap.isTweening(fg)) return
      gsap.fromTo(fg, { x: cw }, { duration: gsap.utils.random(2, 3), x: -350, ease: 'none' })
      gsap.delayedCall(gsap.utils.random(3, 5), moveFg)
    }

    const drawCanvas = () : void => {
        if(canvasRef.current) {
            cw = canvasRef.current.width = window.innerWidth
            ch = canvasRef.current.height = window.innerHeight
      
            const ctx = canvasRef.current.getContext("2d")
             if(ctx  ) {
                ctx.clearRect(0, 0, cw, ch)
      
                for (const layer of bg) {
                    if(layer.fill) 
                  ctx.fillStyle = layer.fill
                  ctx.translate(layer.x, layer.y)
                  ctx.fillRect(0, 0, cw + layer.width, layer.height)
                  ctx.translate(-layer.x, -layer.y)
                }
          
                if (!dinoJump.show) ctx.drawImage(dust1.img, dust1.spriteOffsetX, 0, 75, 55, dust1.x, dust1.y, 75, 55)
                if (dinoJump.show) ctx.drawImage(dinoJump.img, dinoJump.spriteOffsetX, 0, 250, 240, dino.x, dino.top - 100, 250, 240)
                else {
                  ctx.drawImage(dino.img, dino.spriteOffsetX, 0, 280, 140, dino.x, dino.top, 280, 140)
                  ctx.drawImage(eyeLid.img, eyeLid.spriteOffsetX, 0, 280, 140, dino.x, dino.top, 280, 140)
                }
                ctx.drawImage(dust2.img, dust2.spriteOffsetX, 0, 75, 55, dust2.x, dust2.y, 75, 55)
          
                if (coin.show) {
                  ctx.globalCompositeOperation = 'screen'
                  ctx.drawImage(coin.img, coin.spriteOffsetX, 0, 80, 80, cw - coin.right, coin.top, 80, 80)
                  ctx.globalCompositeOperation = 'source-over'
                } else {
                  ctx.drawImage(dinoJumpGlow.img, dinoJumpGlow.spriteOffsetX, 0, 250, 240, dino.x, dino.top - 100, 250, 240)
                }
          
                if (den.show) {
                  ctx.globalCompositeOperation = 'screen'
                  ctx.drawImage(den.img, den.spriteOffsetX, 0, 80, 80, cw - den.right, coin.top, 80, 80)
                  ctx.globalCompositeOperation = 'source-over'
                } else {
                  ctx.drawImage(dinoJumpGlow.img, dinoJumpGlow.spriteOffsetX, 0, 250, 240, dino.x, dino.top - 100, 250, 240)
                }
          
                ctx.drawImage(fg.img, fg.x, fg.top, 350, 90)
             }
    
        }
   
    }

    // window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleKeyboardMove)
    canvasRef.current?.addEventListener('click', handleJump)

    dino.img.src = 'https://assets.codepen.io/721952/gameDino.png'
    eyeLid.img.src = 'https://assets.codepen.io/721952/gameBlink.png'
    dinoJump.img.src = 'https://assets.codepen.io/721952/gameJump.png'
    dinoJumpGlow.img.src = 'https://assets.codepen.io/721952/gameJumpGlow.png'

    gsap.to(dino, { duration: 0.55, spriteOffsetX: 1400, ease: 'steps(5)', repeat: -1, onRepeat: () => {
      if (Math.random() < 0.4) gsap.fromTo(eyeLid, { spriteOffsetX: 0 }, { duration: 0.55, spriteOffsetX: 1400, ease: 'steps(5)' })
    }})
    gsap.to(dino, { duration: 1.2, top: 416, ease: 'power1.inOut', yoyo: true, repeat: -1 })

    dust1.img.src = dust2.img.src = 'https://assets.codepen.io/721952/gameDust.png'
    gsap.to(dust1, { duration: 0.6, spriteOffsetX: 975, ease: 'steps(13)', repeat: -1 })
    gsap.fromTo(dust1, { x: () => dino.x + 70 }, { duration: 0.6, repeat: -1, ease: 'sine', x: '-=100', repeatRefresh: true })
    gsap.fromTo(dust1, { y: () => dino.top + 95 }, { duration: 0.6, repeat: -1, ease: 'sine.in', y: '-=50', repeatRefresh: true })
    gsap.to(dust2, { duration: 0.6, delay: 0.2, spriteOffsetX: 975, ease: 'steps(13)', repeat: -1 })
    gsap.fromTo(dust2, { x: () => dino.x + 70 }, { delay: 0.2, duration: 0.6, repeat: -1, ease: 'sine', x: '-=150', repeatRefresh: true })
    gsap.fromTo(dust2, { y: () => dino.top + 95 }, { delay: 0.2, duration: 0.6, repeat: -1, ease: 'sine.in', y: '-=30', repeatRefresh: true })

    fg.img.src = 'https://assets.codepen.io/721952/gameFg.png'
    fg.img.onload = moveFg

    coin.img.src = 'https://assets.codepen.io/721952/gameCoin.png'
    const cTL = gsap.timeline({ paused: true }).to(coin, { spriteOffsetX: 400, ease: 'steps(5)', repeat: 4 })
    gsap.to(cTL, { progress: 1, duration: 1.2, ease: 'sine.inOut', repeat: -1 })
    gsap.to(coin, { duration: 0.6, yoyo: true, repeat: -1, top: 310, ease: 'sine.inOut' })
    den.img.src = 'https://assets.codepen.io/721952/gameCoin.png'
    const dxl = gsap.timeline({ paused: true }).to(den, { spriteOffsetX: 400, ease: 'steps(5)', repeat: 4 })
    gsap.to(dxl, { progress: 1, duration: 1.2, ease: 'sine.inOut', repeat: -1 })
    gsap.to(den, { duration: 0.6, yoyo: true, repeat: -1, top: 310, ease: 'sine.inOut' })

    for (let i = 0; i < 5; i++) {
      const img = new Image()
      img.id = String(i)
      img.src = (i === 0) ? 'https://assets.codepen.io/721952/gameLayer0.jpg' : `https://assets.codepen.io/721952/gameLayer${i}.png`
      img.onload = makeLayer
    }

    const ctx =  canvasRef?.current?.getContext("2d")
    const ticker = gsap.ticker.add(() => {drawCanvas()})

    return () => {
      // window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleKeyboardMove)
      canvasRef.current?.removeEventListener('click', handleJump)
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (

        <canvas ref={canvasRef}  />
)
}