"use client"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const DEADZONE = 0.15
const PAN_SPEED = 0.03
const ORBIT_SPEED = 0.015
const ZOOM_SPEED = 0.25

export default function GamepadControls() {
  const { camera, controls } = useThree()

  useFrame((_, delta) => {
    // Try to get active gamepads
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
    let gp = null
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        gp = gamepads[i]
        break
      }
    }

    if (!gp) return

    const orbit = controls as any
    if (!orbit) return

    // PlayStation Controller Default Mappings
    // Left Stick: Axes 0 (X), 1 (Y)
    // Right Stick: Axes 2 (X), 3 (Y)
    // L2: Button 6, R2: Button 7

    const leftX = Math.abs(gp.axes[0]) > DEADZONE ? gp.axes[0] : 0
    const leftY = Math.abs(gp.axes[1]) > DEADZONE ? gp.axes[1] : 0
    
    const rightX = Math.abs(gp.axes[2]) > DEADZONE ? gp.axes[2] : 0
    const rightY = Math.abs(gp.axes[3]) > DEADZONE ? gp.axes[3] : 0

    const l2 = gp.buttons[6]?.value || 0
    const r2 = gp.buttons[7]?.value || 0

    // Time-corrected multiplier (assumes ~60fps baseline)
    const t = delta * 60

    // 1. Pan (Left Stick) - Moves the target and camera on the horizontal plane relative to camera.up
    if (leftX !== 0 || leftY !== 0) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      forward.projectOnPlane(camera.up).normalize()

      const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
      rightVec.projectOnPlane(camera.up).normalize()

      const moveDir = new THREE.Vector3()
      moveDir.addScaledVector(rightVec, leftX * PAN_SPEED * t)
      moveDir.addScaledVector(forward, -leftY * PAN_SPEED * t) 

      orbit.target.add(moveDir)
      camera.position.add(moveDir)
    }

    // 2. Orbit (Right Stick) - Rotates around the target
    if (rightX !== 0 || rightY !== 0) {
      const offset = camera.position.clone().sub(orbit.target)

      // Horizontal rotation (around camera.up)
      const angleX = -rightX * ORBIT_SPEED * t
      const quatX = new THREE.Quaternion().setFromAxisAngle(camera.up, angleX)
      offset.applyQuaternion(quatX)

      // Vertical rotation (around local right axis)
      const rightDir = new THREE.Vector3().crossVectors(camera.up, offset).normalize()
      const angleY = -rightY * ORBIT_SPEED * t 
      
      const currentPolar = offset.angleTo(camera.up)
      const newPolar = currentPolar - angleY
      
      // Clamp polar angle based on OrbitControls limits
      const maxPolar = orbit.maxPolarAngle || (Math.PI / 2.05)
      const minPolar = orbit.minPolarAngle || 0.1

      if (newPolar >= minPolar && newPolar <= maxPolar) {
        const quatY = new THREE.Quaternion().setFromAxisAngle(rightDir, angleY)
        offset.applyQuaternion(quatY)
      }

      camera.position.copy(orbit.target).add(offset)
      camera.lookAt(orbit.target)
    }

    // 3. Zoom (Triggers) - Dolly in/out
    const zoomVal = r2 - l2
    if (zoomVal !== 0) {
      const dir = camera.position.clone().sub(orbit.target).normalize()
      const dist = camera.position.distanceTo(orbit.target)
      
      const zoomDelta = -zoomVal * ZOOM_SPEED * t
      
      // Prevent zooming through the target or infinitely far away
      if ((dist > 2 || zoomDelta > 0) && (dist < 150 || zoomDelta < 0)) {
        camera.position.add(dir.multiplyScalar(zoomDelta))
      }
    }

    orbit.update()
  })

  return null
}
