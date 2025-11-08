'use client';
import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type Node = {
  id: string;
  type: string;
  props: Record<string, any>;
  children: string[];
};

type EditorState = {
  nodes: Record<string, Node>;
  rootId: string;
  selectedId?: string | null;
  past: Record<string, Node>[];
  future: Record<string, Node>[];
  addNode: (
    type: string,
    props?: Record<string, any>,
    parentId?: string
  ) => string;
  updateProps: (
    id: string,
    props: Partial<Node['props']>,
    pushHistory?: boolean
  ) => void;
  selectNode: (id?: string | null) => void;
  removeNode: (id: string, pushHistory?: boolean) => void;
  setNodes: (nodes: Record<string, Node>, pushHistory?: boolean) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: { root: { id: 'root', type: 'Root', props: {}, children: [] } },
  rootId: 'root',
  selectedId: null,
  past: [],
  future: [],

  addNode: (type, props = {}, parentId = 'root') => {
    const id = nanoid();
    set((s) => {
      const snapshot = JSON.parse(JSON.stringify(s.nodes));
      const past = [...s.past, snapshot];
      const nodes = { ...s.nodes, [id]: { id, type, props, children: [] } };
      const parent = nodes[parentId];
      if (parent) {
        nodes[parentId] = { ...parent, children: [...parent.children, id] };
      } else {
        nodes[parentId] = {
          id: parentId,
          type: 'Container',
          props: {},
          children: [id],
        };
      }
      return { nodes, past, future: [] };
    });
    return id;
  },

  updateProps: (id, props, pushHistory = true) => {
    set((s) => {
      const nodes = { ...s.nodes };
      if (!nodes[id]) return { nodes: s.nodes };
      const past = pushHistory
        ? [...s.past, JSON.parse(JSON.stringify(s.nodes))]
        : s.past;
      nodes[id] = { ...nodes[id], props: { ...nodes[id].props, ...props } };
      return { nodes, past, future: pushHistory ? [] : s.future };
    });
  },

  removeNode: (id, pushHistory = true) =>
    set((s) => {
      const nodes = { ...s.nodes };
      if (!nodes[id]) return { nodes: s.nodes };
      const past = pushHistory
        ? [...s.past, JSON.parse(JSON.stringify(s.nodes))]
        : s.past;
      delete nodes[id];
      Object.keys(nodes).forEach((k) => {
        nodes[k] = {
          ...nodes[k],
          children: (nodes[k].children || []).filter((c) => c !== id),
        };
      });
      return { nodes, past, future: pushHistory ? [] : s.future };
    }),

  setNodes: (nodes, pushHistory = true) =>
    set((s) => {
      const past = pushHistory
        ? [...s.past, JSON.parse(JSON.stringify(s.nodes))]
        : s.past;
      return { nodes, past, future: pushHistory ? [] : s.future };
    }),

  selectNode: (id) => set(() => ({ selectedId: id ?? null })),
  moveNode: (id: string, newParentId = 'root') =>
    set((s) => {
      // prevent moving root or into itself or into its descendants
      if (id === 'root' || id === newParentId) return { nodes: s.nodes };
      const nodes = JSON.parse(JSON.stringify(s.nodes));
      if (!nodes[id] || !nodes[newParentId]) return { nodes: s.nodes };
      // check descendant
      function isDescendant(target: string, candidate: string): boolean {
        if (!nodes[target] || !nodes[target].children) return false;
        if (nodes[target].children.includes(candidate)) return true;
        return nodes[target].children.some((c: string) =>
          isDescendant(c, candidate)
        );
      }
      if (isDescendant(id, newParentId)) return { nodes: s.nodes };
      // remove id from previous parent
      Object.keys(nodes).forEach((k) => {
        nodes[k].children = (nodes[k].children || []).filter(
          (c: string) => c !== id
        );
      });
      // append to new parent
      nodes[newParentId].children = [
        ...(nodes[newParentId].children || []),
        id,
      ];
      return {
        nodes,
        past: [...s.past, JSON.parse(JSON.stringify(s.nodes))],
        future: [],
      };
    }),

  undo: () =>
    set((s) => {
      if (!s.past.length) return s;
      const previous = s.past[s.past.length - 1];
      const newPast = s.past.slice(0, -1);
      const future = [JSON.parse(JSON.stringify(s.nodes)), ...s.future];
      return { nodes: previous, past: newPast, future };
    }),

  redo: () =>
    set((s) => {
      if (!s.future.length) return s;
      const next = s.future[0];
      const newFuture = s.future.slice(1);
      const past = [...s.past, JSON.parse(JSON.stringify(s.nodes))];
      return { nodes: next, past, future: newFuture };
    }),

  clearHistory: () => set(() => ({ past: [], future: [] } as any)),
}));
