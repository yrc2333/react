import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, ThreeEvent, useLoader, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { SRGBColorSpace } from 'three'
import * as THREE from 'three'
import {
  DecalGeometry,
  DRACOLoader,
  GLTFLoader,
} from 'three/examples/jsm/Addons.js'

function Background() {
  const { scene } = useThree()
  useTexture('./sky.png', (tex) => {
    tex.colorSpace = SRGBColorSpace
    scene.background = tex
  })
  return null
}

function App() {
  return (
    <Canvas
      camera={{
        position: [0, 500, 500],
      }}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}>
      <Background />
      <ambientLight />
      <axesHelper args={[1000]} />
      <directionalLight position={[500, 400, 300]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Tshirt />
      </Suspense>
    </Canvas>
  )
}

function Tshirt() {
  const gltf = useLoader(GLTFLoader, 'tshirt.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    )
    loader.setDRACOLoader(dracoLoader)
  })
  gltf.scene.scale.setScalar(1000)

  let texture: THREE.Texture
  useTexture('./sky.png', (tex) => {
    tex.colorSpace = SRGBColorSpace
    texture = tex
  })

  const { scene } = useThree()

  return (
    <primitive
      object={gltf.scene}
      onClick={(evt: ThreeEvent<MouseEvent>) => {
        console.log(evt.point)
        const obj = evt.object as THREE.Mesh
        const orientation = new THREE.Euler()
        const size = new THREE.Vector3(200, 200, 200)
        const geometry = new DecalGeometry(obj, evt.point, orientation, size)
        const material = new THREE.MeshPhongMaterial({
          polygonOffset: true,
          polygonOffsetUnits: -10,
          map: texture,
          transparent: true,
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        console.log(evt.object)
      }}></primitive>
  )
}

export default App
