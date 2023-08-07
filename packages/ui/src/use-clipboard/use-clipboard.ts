import { useCallback } from 'react';
import usePortal from '../utils/use-portal';
import useWarning from '../utils/use-warning';

export type UseClipboardOptions = {
  onError?: () => unknown;
};

export type UseClipboardResult = {
  copy: (text: string) => void;
};

const defaultOptions = {
  onError: () => useWarning('Failed to Copy.', 'use-clipboard'),
};

export default function useClipboard({
  onError = defaultOptions.onError,
}: UseClipboardOptions = defaultOptions): UseClipboardResult {
  const el = usePortal('clipboard');

  const copyText = (el: HTMLElement | null, text: string) => {
    if (!el || !text) return;

    if (!navigator.clipboard) {
      const selection = window.getSelection();
      if (!selection) return;

      el.style.whiteSpace = 'pre';
      el.textContent = text;

      const range = window.document.createRange();

      selection.removeAllRanges();
      range.selectNode(el);
      selection.addRange(range);

      try {
        window.document.execCommand('copy');
      } catch (e) {
        onError();
      }

      selection.removeAllRanges();

      if (el) el.textContent = '';
    } else navigator.clipboard.writeText(text).catch(onError);
  };

  const copy = useCallback((text: string) => copyText(el, text), [el]);

  return { copy };
}
