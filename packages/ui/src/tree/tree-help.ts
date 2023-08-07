import {
  Children,
  ElementType,
  MouseEvent,
  ReactNode,
  isValidElement,
} from 'react';

export function sortChildren(
  children: ReactNode | undefined,
  folderType: ElementType
) {
  return Children.toArray(children).sort((a, b) => {
    if (!isValidElement(a) || !isValidElement(b)) return 0;
    if (a.type !== b.type) return a.type !== folderType ? 1 : -1;

    return `${a.props.name}`.charCodeAt(0) - `${b.props.name}`.charCodeAt(0);
  });
}

export function makeChildPath(name: string, parentPath?: string) {
  if (!parentPath) return name;
  return `${parentPath}/${name}`;
}

export function stopPropagation(event: MouseEvent) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}
