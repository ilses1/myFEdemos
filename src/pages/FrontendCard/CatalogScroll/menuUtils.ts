import type { MenuNode } from './menu';

export type MenuSection = {
  key: string;
  title: string;
  level: number;
};

export const buildMenuDerived = (root: MenuNode[]) => {
  const keyToAncestorKeys = new Map<string, string[]>();
  const openKeySet = new Set<string>();
  const sections: MenuSection[] = [];

  const walk = (nodes: MenuNode[], ancestors: string[] = [], level = 0) => {
    nodes.forEach((node) => {
      keyToAncestorKeys.set(node.key, ancestors);
      sections.push({ key: node.key, title: node.title, level });

      if (node.children && node.children.length > 0) {
        openKeySet.add(node.key);
        walk(node.children, [...ancestors, node.key], level + 1);
      }
    });
  };

  walk(root);

  return {
    sections,
    keyToAncestorKeys,
    defaultOpenKeys: Array.from(openKeySet),
  };
};
