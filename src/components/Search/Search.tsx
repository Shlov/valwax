import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import Input from '../Input/Input';

import styles from './Search.module.scss';

interface SearchResult {
  id: number;
  name: string;
}

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <div className={styles.searchWrapper}>
      <AiOutlineSearch
        style={{ strokeWidth: '2px' }}
        className={styles.searchIcon}
        color="var(--cl-gray-700)"
      />

      <Input
        type="text"
        placeholder="Пошук"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      
      />
      <AiOutlineClose
        style={{ strokeWidth: '4px' }}
        className={styles.closeIcon}
        color="var(--cl-gray-700)"
        onClick={onClose}
      />
    </div>
  );
};

export default Search;