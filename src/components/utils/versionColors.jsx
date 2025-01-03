export const versionColors = {
  a: '#FF5733', // Red
  b: '#33B5FF', // Blue
  c: '#66BB6A', // Less flashy Green
  d: '#FF33A8', // Pink
  e: '#FF8C33', // Orange
  f: '#8C33FF', // Purple
  g: '#66DD8C', // Light Green
  h: '#FF3333', // Bright Red
  i: '#33FFF5', // Cyan
  j: '#FF33F5', // Magenta
  k: '#FFD133', // Yellow
  l: '#33FFD1', // Teal
  m: '#FF5733', // Red (Hue variation)
  n: '#33B5FF', // Blue (Hue variation)
  o: '#66BB6A', // Less flashy Green (Hue variation)
  p: '#FF33A8', // Pink (Hue variation)
  q: '#FF8C33', // Orange (Hue variation)
  r: '#8C33FF', // Purple (Hue variation)
  s: '#33FF8C', // Light Green (Hue variation)
  t: '#FF3333', // Bright Red (Hue variation)
  u: '#33FFF5', // Cyan (Hue variation)
  v: '#FF33F5', // Magenta (Hue variation)
  w: '#FFD133', // Yellow (Hue variation)
  x: '#33FFD1', // Teal (Hue variation)
  y: '#FF5733', // Red (Hue variation)
  z: '#33B5FF', // Blue (Hue variation)
  '*': '#5C5C5C', // Grey
}

export const getVersionColor = (version) => versionColors[version] || 'grey'
