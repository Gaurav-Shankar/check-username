import React, { useState, useEffect } from 'react';
import './App.css';
import Username from './Username';
import Sites from './Sites';

const App = () => {
	const [sites,setSites] = useState([]);
	const [currentSites,setCurrentSites] = useState(sites);
	const [percentage,setPercentage] = useState(null);
	const [isLoading,setIsLoading] = useState(true);
	const [inputValue,setInputValue] = useState('');
	const [username,setUsername] = useState(null);
	useEffect(() => {
		getSites();
	},[setSites]);
	return (
	  <div>
	  	<Username search={inputValue} setInputValue={setInputValue} checkUsername={(user)=>checkUsername(user)} />
	  	<input placeholder="search sites" onChange={(e)=>searchSites(e)} />
	  	<div>{percentage && `Username '${username}' is unavailable on ${percentage}% of websites that we checked`}</div>
	  	{isLoading ? <div style={{textAlign:'center'}}><img src="download.gif" alt="loading" /></div> : <Sites sites={currentSites} />}
	  </div>
 );
	async function checkUsername(user) {
		if (user.length) {
			setIsLoading(true);
			setUsername(user);
			setInputValue('');
			setPercentage(null);
			fetch(`/api/user/${user}`,{accept:'application/json'})
			.then(res=>res.json())
			.then(({ percentage, sites }) => {
				setIsLoading(false);
				setPercentage(percentage);
				setCurrentSites(sites);
			})
			.catch(err=>console.error('user',err))
		}
	}

	async function getSites() {
		setIsLoading(true);
		fetch(`/api/sites`,{accept:'application/json'})
		.then(res=>res.json())
		.then(data => {
			setIsLoading(false);
			setSites(data);
			setCurrentSites(data);
		})
		.catch(err=>console.error('sites',err))
	}
	function searchSites(e) {
		setCurrentSites(sites.filter(site => ~site.name.indexOf(e.target.value)));
	}
}

export default App;
