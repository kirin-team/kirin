import {
  PropsWithChildren,
  Ref,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
} from 'react';
import { capitalize } from '../collections';
import useContextState, {
  ContextHandler,
  ContextHandlerWhere,
  ContextStateFilter,
  ContextStateOnChange,
  ContextStates,
} from './use-context-state';

function makeVirtualValues<S extends object>(values: S): ContextStates<S> {
  const keys = Object.keys(values) as Array<keyof S>;

  const handlers = keys.reduce<ContextHandler<S>>((pre, current) => {
    const updateHandler = {
      [`set${capitalize(current)}`]: (_next: S[typeof current]) => {},
    };

    return { ...pre, ...updateHandler };
  }, {} as ContextHandler<S>);

  const update: ContextHandlerWhere<S> = (_key, _next) => {};

  return {
    update,
    ...values,
    ...handlers,
  };
}

export type KirinNamedContext<T, N> = {
  [key in string as `use${Capitalize<string & N>}Context`]: () => T;
};

export type KirinNamedProvider<T, N> = {
  [key in string as `${Capitalize<string & N>}Provider`]: T;
};

export function createKirinContext<
  S extends Record<string, unknown>,
  N extends string
>(name: N, initialStates: S) {
  const virtualValues = makeVirtualValues(initialStates);
  const Context = createContext(virtualValues);

  type KirinContextProps = {
    defaultValues?: Partial<S> | (() => Partial<S>);
    onChange?: ContextStateOnChange<S>;
    onChangeBefore?: ContextStateFilter<S>;
  };

  const KirinContext = forwardRef(
    (
      {
        defaultValues,
        children,
        onChange,
        onChangeBefore,
      }: PropsWithChildren<KirinContextProps>,
      ref: Ref<S>
    ) => {
      const initialValues =
        typeof defaultValues === 'function'
          ? (defaultValues as () => S)()
          : defaultValues;

      const mergedValues = {
        ...initialStates,
        ...initialValues,
      } as Required<S>;

      const [states, , statesRef] = useContextState(mergedValues, {
        onChange: onChange ? onChange : () => {},
        filter: onChangeBefore ? onChangeBefore : () => true,
      });

      useImperativeHandle(ref, () => statesRef.current, [statesRef.current]);

      return <Context.Provider value={states}>{children}</Context.Provider>;
    }
  );

  KirinContext.displayName = `${capitalize(name)}Provider`;

  type ResultType = KirinNamedProvider<typeof KirinContext, N> &
    KirinNamedContext<ContextStates<S>, N>;

  return {
    [`${capitalize(name)}Provider`]: KirinContext,
    [`use${capitalize(name)}Context`]: () => useContext(Context),
  } as ResultType;
}
