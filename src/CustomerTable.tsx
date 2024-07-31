import React from 'react';

interface Address {
	city: string;
}

interface User {
	id: number;
	firstName: string;
	lastName: string;
	address: Address;
	birthDate: string;
	isOldest?: boolean;
}

interface CustomerTableProps {
	users: User[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ users }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr
						key={user.id}
						className={user.isOldest ? 'highlight-oldest' : ''}
					>
						<td>
							{user.firstName} {user.lastName}
						</td>
						<td>{user.address.city}</td>
						<td>{user.birthDate}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CustomerTable;
