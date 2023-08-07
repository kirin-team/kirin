interface Props {
  count: number;
}

export type TreeIndentsProps = Props;

export default function TreeIndents({ count }: TreeIndentsProps) {
  if (count === 0) return null;
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <span className="indent" key={`indent-${index}`}>
          <style jsx>{`
            span.indent {
              left: calc(-1.875rem * ${index + 1} + 0.75rem);
            }
          `}</style>
        </span>
      ))}
    </>
  );
}
