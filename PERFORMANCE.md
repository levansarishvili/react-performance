# Performance Optimization Report

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 1.5s
- **Render duration**: 33.4ms
- **Screenshot**: ![screenshot](./src/performance-starter/screenshots/optimize/sort-countries.png)

### Interaction B: Search countries

- **Commit duration**: 1.6s
- **Render duration**: 16.8ms
- **Screenshot**: ![screenshot](./src/performance-starter/screenshots/optimize/search-countries.png)

### Interaction C: Change year

- **Commit duration**: 3.2s
- **Render duration**: 30.8ms
- **Screenshot**: ![screenshot](./src/performance-starter/screenshots/optimize/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: 1.1s
- **Render duration**: 13.8ms
- **Screenshot**: ![screenshot](./src/performance-starter/screenshots/optimize/toggle-column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 423.4         | 33.4           | 92.1%       |
| Search countries | 166.4         | 16.8           | 89.9%       |
| Change year      | 33            | 30.8           | 6.7%        |
| Toggle column    | 36.6          | 13.8           | 62.3%       |
| **Average**      | **164.7**     | **23.8**       | **85.6%**   |
