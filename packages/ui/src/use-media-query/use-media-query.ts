import { useEffect, useMemo, useState } from 'react';
import { BreakpointsItem, KirinThemesBreakpoints } from '../themes/presets';
import useTheme from '../use-theme';
import { tuple } from '../utils/prop-types';

const breakpoints = tuple('xs', 'sm', 'md', 'lg', 'xl', 'mobile');
export type ResponsiveBreakpoint = (typeof breakpoints)[number];

const matchType = tuple('up', 'down', 'default');
export type ResponsiveMatchType = (typeof matchType)[number];

export type ResponsiveOptions = {
  match?: ResponsiveMatchType;
  ssrMatchMedia?: (query: string) => { matches: boolean };
};

const defaultResponsiveOptions = {
  match: 'default' as ResponsiveMatchType,
};

function makeQueries(
  bp: KirinThemesBreakpoints,
  up: boolean,
  down: boolean
): {
  [key in ResponsiveBreakpoint]: string;
} {
  const queryString = (item: BreakpointsItem) => {
    const upQuery = `(min-width: ${item.min})`;
    const downQuery = `(max-width: ${item.max})`;

    return up ? upQuery : down ? downQuery : `${upQuery} and ${downQuery}`;
  };

  const xs = queryString(bp.xs);

  return {
    xs: xs,
    mobile: xs,
    sm: queryString(bp.sm),
    md: queryString(bp.md),
    lg: queryString(bp.lg),
    xl: queryString(bp.xl),
  };
}

export default function useMediaQuery(
  breakpoint: ResponsiveBreakpoint,
  options: ResponsiveOptions = defaultResponsiveOptions
) {
  const { match: matchType, ssrMatchMedia } = options;

  const supportMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const theme = useTheme();

  const mediaQueries: {
    [key in ResponsiveBreakpoint]: string;
  } = useMemo(() => {
    const up = matchType === 'up';
    const down = matchType === 'down';

    return makeQueries(theme.breakpoints, up, down);
  }, [theme.breakpoints, options]);

  const query = useMemo(
    () => mediaQueries[breakpoint],
    [mediaQueries, breakpoint]
  );

  const matchQuery = (q: string) => window.matchMedia(q);

  const [state, setState] = useState<boolean>(() => {
    if (supportMedia) return matchQuery(query).matches;
    if (ssrMatchMedia && typeof ssrMatchMedia === 'function')
      return ssrMatchMedia(query).matches;

    return false;
  });

  useEffect(() => {
    if (!supportMedia) return;

    const queryList = matchQuery(query);
    const update = () => setState(matchQuery(query).matches);

    update();

    queryList.addEventListener('change', update);
    return () => queryList.removeEventListener('change', update);
  }, [supportMedia]);

  return state;
}
