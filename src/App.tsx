import dpsLogo from './assets/DPS.svg';
import './App.css';
import CustomerManagement from './CustomerManagement';

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<CustomerManagement />
			</div>
		</>
	);
}

export default App;
