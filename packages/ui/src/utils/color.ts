function hexToRgb(color: string): [number, number, number] {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  const full = color.replace(
    fullReg,
    (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`
  );

  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);

  if (!values) throw new Error(`Kirin: Unsupported Color - ${color}.`);

  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ];
}

export function colorToRgbValues(color: string) {
  if (color.charAt(0) === '#') return hexToRgb(color);

  const safeColor = color.replace(/ /g, '');
  const colorType = color.substring(0, 5);

  const regArray = safeColor.match(/\((.+)\)/);

  if (!colorType.startsWith('rgb') || !regArray)
    throw new Error(`Kirin: Unsupported Color Type.`);

  return regArray[1].split(',').map((str) => Number.parseFloat(str));
}

export function addColorAlpha(color: string, alpha: number) {
  if (!/^#|rgb|RGB/.test(color)) return color;

  const [r, g, b] = colorToRgbValues(color);
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;

  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}
