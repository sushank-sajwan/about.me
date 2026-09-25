import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// A "neural/agent network": nodes on a sphere shell linked to near neighbours,
// wrapped around a morphing core. The whole thing leans toward the pointer.

const NODE_COUNT = 90
const LINK_DIST = 1.15

function Network({ accent, accent2 }: { accent: string; accent2: string }) {
  const group = useRef<THREE.Group>(null!)
  const pulse = useRef<THREE.Points>(null!)

  const { nodes, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      // Fibonacci sphere with some radial jitter
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = i * Math.PI * (3 - Math.sqrt(5))
      const radius = 2.2 + Math.sin(i * 12.9898) * 0.25
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius))
    }
    const segs: number[] = []
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++)
        if (pts[i].distanceTo(pts[j]) < LINK_DIST) segs.push(...pts[i].toArray(), ...pts[j].toArray())
    return {
      nodes: new Float32Array(pts.flatMap((p) => p.toArray())),
      lines: new Float32Array(segs),
    }
  }, [])

  useFrame(({ pointer, clock }, dt) => {
    const g = group.current
    g.rotation.y += dt * 0.08
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.35, 0.04)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.x * 0.2, 0.04)
    const m = pulse.current.material as THREE.PointsMaterial
    m.size = 0.07 + Math.sin(clock.elapsedTime * 2) * 0.02
  })

  return (
    <group ref={group}>
      <points ref={pulse}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial color={accent2} size={0.07} sizeAttenuation transparent opacity={0.95} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.28} />
      </lineSegments>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial color={accent} distort={0.38} speed={2} roughness={0.15} metalness={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroScene({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={2} color={accent2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={accent} />
      <Network accent={accent} accent2={accent2} />
    </Canvas>
  )
}
