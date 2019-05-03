import React, { useState, useEffect } from 'react';
import './Sites.css';

const Sites = ({sites}) => (
  <div className="sites">
  	{sites.map(site => (
  		<div className="site" key={site.name}>{site.name}</div>
  	))}
  </div>
)

export default Sites;
