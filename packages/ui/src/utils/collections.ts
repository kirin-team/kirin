import React, {
  Children,
  ElementType,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};

export const capitalize = (
  str: string | symbol | number | undefined | null
) => {
  const safeStr = String(str).trim();
  return safeStr.charAt(0).toUpperCase() + safeStr.slice(1);
};

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): boolean => {
  const types = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null;
    return item.type;
  });

  return (types || []).includes(child);
};

export function pickChild(
  children: ReactNode | undefined,
  targetChild: ElementType
): [ReactNode | undefined, ReactNode | undefined] {
  let target: ReactNode[] = [];

  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;

    if (item.type === targetChild) {
      target.push(item);
      return null;
    }

    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
}

export function pickChildByProps(
  children: ReactNode | undefined,
  key: string,
  value: any
): [ReactNode | undefined, ReactNode | undefined] {
  let target: ReactNode[] = [];
  const isArray = Array.isArray(value);

  const withoutPropChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return null;
    if (!item.props) return item;

    if (isArray) {
      if (value.includes(item.props[key])) {
        target.push(item);
        return null;
      }

      return item;
    }

    if (item.props[key] === value) {
      target.push(item);
      return null;
    }

    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutPropChildren, targetChildren];
}

export function pickChildrenFirst(
  children: ReactNode | undefined
): ReactNode | undefined {
  return Children.toArray(children)[0];
}

export function setChildrenProps(
  children: ReactNode | undefined,
  props: Record<string, unknown>,
  targetComponents: Array<ElementType> = []
): ReactNode | undefined {
  if (!Children.count(children)) return [];

  const allowAll = !targetComponents.length;
  const clone = (child: ReactElement, props = {}) => cloneElement(child, props);

  return Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (allowAll) return clone(item, props);

    const isAllowed = targetComponents.find((child) => child === item.type);
    if (isAllowed) return clone(item, props);

    return item;
  });
}

export function setChildrenIndex(
  children: ReactNode | undefined,
  targetComponents: Array<ElementType> = []
): ReactNode | undefined {
  if (!Children.count(children)) return [];

  const allowAll = !targetComponents.length;
  const clone = (child: ReactElement, props = {}) => cloneElement(child, props);

  let index = 0;

  return Children.map(children, (item) => {
    if (!isValidElement(item)) return item;

    index = index + 1;

    if (allowAll) return clone(item, { index });

    const isAllowed = targetComponents.find((child) => child === item.type);
    if (isAllowed) return clone(item, { index });

    index = index - 1;

    return item;
  });
}

export function getReactNode(node?: ReactNode | (() => ReactNode)): ReactNode {
  if (!node) return null;
  if (typeof node !== 'function') return node;

  return (node as () => ReactNode)();
}

export function isChildElement(
  parent: Element | null | undefined,
  child: Element | null | undefined
) {
  if (!parent || !child) return false;

  let node: (Node & ParentNode) | null = child;

  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
}

export function isKirinElement(el?: HTMLElement) {
  if (!el) return false;
  if (el?.dataset && el?.dataset['kirin']) return true;
  return !!el.attributes.getNamedItem('data-kirin');
}

export function isBrowser() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );
}

export function isMac() {
  if (!isBrowser()) return false;
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

export function isCSSNumberValue(value?: string | number) {
  return value !== undefined && !Number.isNaN(+value);
}
