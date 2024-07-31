import React, { useState, useEffect } from 'react';
import CustomerTable from './CustomerTable';
import SearchInput from './SearchInput';
import CityDropdown from './CityDropdown';
import HighlightOldestCheckbox from './HighlightOldestCheckbox';

// Define types for user data
interface Address {
	city: string;
}

interface User {
	id: number;
	firstName: string;
	lastName: string;
	address: Address;
	birthDate: string;
	isOldest?: boolean; // Optional property for highlighting
}

const CustomerManagement: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [searchText, setSearchText] = useState<string>('');
	const [selectedCity, setSelectedCity] = useState<string>('');
	const [highlightOldest, setHighlightOldest] = useState<boolean>(false);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch('https://dummyjson.com/users');
			const data = await response.json();
			setUsers(data.users);
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		let filtered = users.filter(
			(user) =>
				user.firstName
					.toLowerCase()
					.includes(searchText.toLowerCase()) ||
				user.lastName.toLowerCase().includes(searchText.toLowerCase())
		);

		if (selectedCity) {
			filtered = filtered.filter(
				(user) => user.address.city === selectedCity
			);
		}

		if (highlightOldest) {
			const oldestUsers: Record<string, User> = {};
			filtered.forEach((user) => {
				if (
					!oldestUsers[user.address.city] ||
					new Date(user.birthDate) <
						new Date(oldestUsers[user.address.city].birthDate)
				) {
					oldestUsers[user.address.city] = user;
				}
			});
			filtered = filtered.map((user) => ({
				...user,
				isOldest: oldestUsers[user.address.city] === user,
			}));
		} else {
			filtered = filtered.map((user) => ({ ...user, isOldest: false }));
		}

		setFilteredUsers(filtered);
	}, [searchText, selectedCity, highlightOldest, users]);

	return (
		<>
			<div className='container'>
				<span className='input-wrapper'><SearchInput onSearch={setSearchText} /></span>
				<span className='input-wrapper'><CityDropdown users={users} onCityChange={setSelectedCity} /></span>
				<span><HighlightOldestCheckbox onChange={setHighlightOldest} /></span>
			</div>
			<div className="margin-top">
				<CustomerTable users={filteredUsers} />
			</div>
		</>
	);
};

export default CustomerManagement;
