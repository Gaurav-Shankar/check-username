import React from 'react';
import './Sites.css';

const Sites = ({sites}) => (
  <div className="sites">
  	{sites.map(site => (
  		<div className={`site ${site.class}`} key={site.name}>{site.name}</div>
  	))}
  </div>
)

export default Sites;
