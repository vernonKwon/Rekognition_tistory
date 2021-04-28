export interface Data {
  faceDetails: FaceDetail[]
}

export interface FaceDetail {
  boundingBox: BoundingBox
  ageRange: AgeRange
  smile: Beard
  eyeglasses: Beard
  sunglasses: Beard
  gender: Gender
  beard: Beard
  mustache: Beard
  eyesOpen: Beard
  mouthOpen: Beard
  emotions: Emotion[]
  landmarks: Landmark[]
  pose: Pose
  quality: Quality
  confidence: number
}

export interface AgeRange {
  low: number
  high: number
}

export interface Beard {
  value: boolean
  confidence: number
}

export interface BoundingBox {
  width: number
  height: number
  left: number
  top: number
}

export interface Emotion {
  type: string
  confidence: number
}

export interface Gender {
  value: string
  confidence: number
}

export interface Landmark {
  type: string
  x: number
  y: number
}

export interface Pose {
  roll: number
  yaw: number
  pitch: number
}

export interface Quality {
  brightness: number
  sharpness: number
}
