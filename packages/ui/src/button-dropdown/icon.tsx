interface Props {
  color?: string;
  height?: string;
}

export type ButtonDropdownIconProps = Props;

export default function ButtonDropdownIcon({
  color,
  height,
}: ButtonDropdownIconProps) {
  return (
    <svg
      stroke={color}
      style={{ color }}
      viewBox="0 0 24 24"
      width={height}
      height={height}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M6 9l6 6 6-6" />

      <style jsx>{`
        svg {
          transform: scale(0.6);
        }
      `}</style>
    </svg>
  );
}
