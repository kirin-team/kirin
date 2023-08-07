import React, { useMemo } from 'react';
import useClasses from '../use-classes';
import { tuple } from '../utils/prop-types';
import { TreeContext } from './tree-context';
import TreeFile from './tree-file';
import TreeFolder from './tree-folder';
import { sortChildren } from './tree-help';

const FileTreeValueType = tuple('directory', 'file');

const directoryType = FileTreeValueType[0];

export type TreeFile = {
  type: (typeof FileTreeValueType)[number];
  name: string;
  extra?: string;
  files?: Array<TreeFile>;
};

interface Props {
  value?: Array<TreeFile>;
  initialExpand?: boolean;
  onClick?: (path: string) => void;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeProps = Props & NativeAttrs;

function makeChildren(value: Array<TreeFile> = []) {
  if (!value || !value.length) return null;

  return value
    .sort((a, b) => {
      if (a.type !== b.type) return a.type !== directoryType ? 1 : -1;
      return `${a.name}`.charCodeAt(0) - `${b.name}`.charCodeAt(0);
    })
    .map((item, index) => {
      if (item.type === directoryType)
        return (
          <TreeFolder
            name={item.name}
            extra={item.extra}
            key={`folder-${item.name}-${index}`}
          >
            {makeChildren(item.files)}
          </TreeFolder>
        );

      return (
        <TreeFile
          name={item.name}
          extra={item.extra}
          key={`file-${item.name}-${index}`}
        />
      );
    });
}

export default function Tree({
  children,
  onClick,
  initialExpand = false,
  value,
  className = '',
  ...props
}: TreeProps) {
  const isImperative = !!value?.length;

  const onFileClick = (path: string) => onClick?.(path);

  const initialValue = useMemo(
    () => ({ onFileClick, initialExpand, isImperative }),
    [initialExpand]
  );

  const customChildren = isImperative
    ? makeChildren(value)
    : sortChildren(children, TreeFolder);

  return (
    <TreeContext.Provider value={initialValue}>
      <div className={useClasses('tree', className)} {...props}>
        {customChildren}

        <style jsx>{`
          .tree {
            padding-left: 1.625rem;
          }
        `}</style>
      </div>
    </TreeContext.Provider>
  );
}
