import React, { useState, useEffect } from 'react';

interface SearchInputProps {
	onSearch: (searchText: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch(inputValue);
		}, 1000); // 1-second debounce

		return () => {
			clearTimeout(handler); // Clear timeout if inputValue changes before 1 second
		};
	}, [inputValue, onSearch]);

	return (
		<input
			type="text"
			placeholder="Search by name"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
		/>
	);
};

export default SearchInput;
