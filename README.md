# Glance Care Assignment

### Simple Dashboard Application That Displays Informations about movies
![Movies Dashboard Application](/public/dashboard.png)
### Tech Stack

- React
- React Router DOM
- For Styling: 
   - TailwindCSS
   - Ant Design
   - Framer Motion
   
- State Management:
   - Redux
   - Redux Toolkit
   
- Unit Testing: 
   - Jest

# For Runnig This Project

 1 - Clone the repository
 ```bash
git clone https://github.com/SalahShaalaan/glance-care-assignment.git
 ```
 2- Navigate to the project directory
 ```bash
 cd glance-care-assignment
 ```
 3- Install dependencies
 ```bash
 npm install
 ```
 
 # Project Structure
```tree

src/
├── __tests__/
│   ├── api.test.js
│   ├── moviesSelectors.test.js
│   ├── moviesSlice.test.js
│   ├── moviesThunks.test.js
│   └── store.test.js
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   ├── shared/
│   │   ├── dashboardData.jsx
│   │   ├── movieCard.jsx
│   │   ├── MoviesData.jsx
│   │   ├── Pagination.jsx
│   │   ├── StatisticsData.jsx
│   │   └── TopPerformersData.jsx
│   └── widgets/
│       ├── FilterPanel.jsx
│       └── LoadingSpinner.jsx
│
├── features/
│   ├── moviesSelectors.js
│   ├── moviesSlice.js
│   └── moviesThunks.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Movies.jsx
│   ├── Statistics.jsx
│   └── TopPerformers.jsx
│
├── services/
│   └── api.js
│
├── store/
│   └── store.js
│
└── utils/
    └── moviesUtils.js

```
## Thanks for Visiting! 👋

Made with ❤️ by Salah Shaalaan

