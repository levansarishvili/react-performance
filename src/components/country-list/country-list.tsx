import React, { useMemo } from 'react';
import { List } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type SharedRowProps = {
  filteredCountries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

export const CountryList = React.memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const filteredCountries = useMemo(() => {
      return countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          }
          const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
          const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        });
    }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

    const RowComponent = ({
      index,
      style,
      ariaAttributes,
    }: {
      ariaAttributes: { 'aria-posinset': number; 'aria-setsize': number; role: 'listitem' };
      index: number;
      style: React.CSSProperties;
    }) => {
      const country = filteredCountries[index];

      if (!country) {
        return null;
      }

      return (
        <div style={style} {...ariaAttributes} key={country.id}>
          <CountryCard
            country={country}
            selectedYear={selectedYear}
            selectedColumns={selectedColumns}
          />
        </div>
      );
    };

    const rowProps: SharedRowProps = useMemo(
      () => ({
        filteredCountries,
        selectedYear,
        selectedColumns,
      }),
      [filteredCountries, selectedYear, selectedColumns]
    );

    if (filteredCountries.length === 0) {
      return <div className={styles.noData}>No countries found matching your criteria.</div>;
    }

    return (
      <div className={styles.countryList}>
        <List
          style={{ height: '700px', width: '100%' }}
          rowCount={filteredCountries.length}
          rowHeight={280}
          rowComponent={RowComponent}
          rowProps={rowProps}
        />
      </div>
    );
  }
);

CountryList.displayName = 'CountryList';
