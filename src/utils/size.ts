type Vector = [x: number, y: number, z: number]

export const adjustCitySizeForScreenSize = () => {
  const screenScale: Vector = [1, 1, 1]
  const screenPosition: Vector = [10, -100, 30];
  const rotation: Vector = [0.1, 4.7, 0]

  return [screenScale, screenPosition, rotation]
}