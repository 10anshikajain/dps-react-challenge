import React from 'react';

interface HighlightOldestCheckboxProps {
	onChange: (checked: boolean) => void;
}

const HighlightOldestCheckbox: React.FC<HighlightOldestCheckboxProps> = ({
	onChange,
}) => {
	return (
		<label>
			<input
				type="checkbox"
				onChange={(e) => onChange(e.target.checked)}
			/>
			Highlight oldest per city
		</label>
	);
};

export default HighlightOldestCheckbox;
