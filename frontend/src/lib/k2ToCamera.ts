import type { Camera, CameraType, CameraStatus } from "@/lib/types"
import { clearViewCache } from "@/lib/cameraVideoMap"

const TYPE_COST: Record<string, number> = {
  "Dome 4K":  29000,
  "Dome IR":  19000,
  "Dome WDR": 23000,
  "Bullet 2K": 17000,
  "PTZ":       50000,
}

/**
 * Convert K2 Think V2 placement output to Camera[] for the store.
 * K2 schema: { id, position_xyz, pan_deg, tilt_deg, fov_h_deg, fov_v_deg, type, rationale }
 * Camera schema: { id, label, type, position, target, fov_h, fov_v, ... }
 */
export function k2PlacementsToCamera(k2cameras: {
  id: string
  position_xyz: [number, number, number]
  pan_deg: number
  tilt_deg: number
  fov_h_deg: number
  fov_v_deg: number
  type: string
  rationale?: string
}[]): Camera[] {
  // Clear cached view configs so the new positions get fresh derivations
  clearViewCache()

  return k2cameras.map((cam) => {
    const [px, py, pz] = cam.position_xyz
    const panR  = (cam.pan_deg  * Math.PI) / 180
    const tiltR = (cam.tilt_deg * Math.PI) / 180
    // Project a target point 5 m ahead in the camera's look direction
    const target: [number, number, number] = [
      px + 5 * Math.sin(panR) * Math.cos(tiltR),
      py + 5 * Math.cos(panR) * Math.cos(tiltR),
      pz + 5 * Math.sin(tiltR),
    ]

    const type = (cam.type || "Dome 4K") as CameraType
    return {
      id:           cam.id,
      label:        cam.id,
      type,
      position:     cam.position_xyz,
      target,
      fov_h:        cam.fov_h_deg ?? 90,
      fov_v:        cam.fov_v_deg ?? 60,
      cost_usd:     TYPE_COST[type] ?? 25000,
      ir_capable:   type.includes("IR"),
      hdr_capable:  type.includes("4K") || type.includes("WDR"),
      status:       "active" as CameraStatus,
      locked:       false,
    }
  })
}
