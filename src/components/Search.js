import { useRef } from 'react';
import { useKey } from '../custom_hooks/useKey';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey(
    'Enter',
    function () {
      if (document.activeElement === inputEl.current) return;
      setQuery('');
      inputEl.current.focus();
    },
    inputEl
  );

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
