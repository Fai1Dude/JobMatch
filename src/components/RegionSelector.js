// src/components/RegionSelector.js

import React, { useState } from 'react';
import { FaSearch, FaGlobeAmericas } from 'react-icons/fa';
import { countries } from './CL';

const RegionSelector = ({ selectedRegion, onRegionSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countries.find(country => country.code === selectedRegion) || countries}