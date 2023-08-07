import React, { Ref, forwardRef } from 'react';
import Link from '../link';

interface Props {
  href?: string;
  className?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<any>, keyof Props>;
export type UserLinkProps = Props & NativeAttrs;

const UserLink = forwardRef(
  (
    { href, className = '', children, ...props }: UserLinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <div className={className} {...props}>
        <Link ref={ref} href={href} color target="_blank" rel="noopener">
          {children}
        </Link>

        <style jsx>{`
          div :global(a:hover) {
            opacity: 0.7;
          }
        `}</style>
      </div>
    );
  }
);

UserLink.displayName = 'UserLink';

export default UserLink;
