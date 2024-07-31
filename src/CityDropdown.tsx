import React, { useEffect, useState } from 'react';

interface Address {
	city: string;
}

interface User {
	address: Address;
}

interface CityDropdownProps {
	users: User[];
	onCityChange: (city: string) => void;
}

const CityDropdown: React.FC<CityDropdownProps> = ({ users, onCityChange }) => {
	const [cities, setCities] = useState<string[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>('');

	useEffect(() => {
		const uniqueCities = [
			...new Set(users.map((user) => user.address.city)),
		];
		setCities(uniqueCities);
	}, [users]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = event.target.value;
		setSelectedCity(selected);
		onCityChange(selected);
	};

	return (
		<select value={selectedCity} onChange={handleChange}>
			<option value="">Select a city</option>
			{cities.map((city, index) => (
				<option key={index} value={city}>
					{city}
				</option>
			))}
		</select>
	);
};

export default CityDropdown;
