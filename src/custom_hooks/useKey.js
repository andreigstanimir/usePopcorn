import { useEffect } from 'react';

function useKey(key, action, inputEl = '') {
  useEffect(
    function () {
      function callback(event) {
        if (event.code.toLowerCase() === key.toLowerCase()) action();
      }
      document.addEventListener('keydown', callback);
      if (inputEl) inputEl.current.focus();
      return () => document.removeEventListener('keydown', callback);
    },
    [key, action, inputEl]
  );
}

export { useKey };
