import Tree from './tree';
import TreeFile from './tree-file';
import TreeFolder from './tree-folder';

export type TreeType = typeof Tree & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};

(Tree as TreeType).File = TreeFile;
(Tree as TreeType).Folder = TreeFolder;

export type { TreeFile, TreeProps } from './tree';

export default Tree as TreeType;
