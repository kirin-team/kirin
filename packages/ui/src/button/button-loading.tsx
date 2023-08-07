import Loading from '../loading';

interface Props {
  color: string;
}

export type ButtonLoading = Props;

export default function ButtonLoading({ color }: ButtonLoading) {
  return (
    <div className="btn-loading">
      <Loading color={color} />

      <style jsx>{`
        .btn-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-color: var(--kirin-button-bg);
        }
      `}</style>
    </div>
  );
}
