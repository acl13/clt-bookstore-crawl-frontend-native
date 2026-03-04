# CLT Bookstore Crawl

A responsive **React Native (Expo)** application that displays independent bookstores that participated in the 2025 CLT Bookstore Crawl in a modern, card-based UI. Users can browse all bookstores and filter results by county using a dropdown selector.

Built as a **mobile-first, cross-platform** project and deployed to the web via Expo + Vercel.

---

## Live Demo

[Deployment](https://clt-bookstore-crawl-frontend.vercel.app/)

---

## Features

- Displays bookstores in a responsive card grid layout
- Filter by county using a dropdown selector
- “Visit Website” button for each bookstore
- Mobile-first responsive design
- Works on web and mobile via Expo

---

## Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- `FlatList` for performant list rendering
- `@react-native-picker/picker` for filtering
- `useWindowDimensions` for responsive layout
- **Vercel** for deployment

---

## Key Implementation Details

### Responsive Grid Layout

The number of columns dynamically adjusts based on screen width:

- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

To prevent React Native’s `numColumns` runtime error, the `FlatList` `key` prop is updated when the column count changes to force a full re-render.

---

### Filtering Logic

County filtering is handled via:

- `useState` for selected county
- A derived `filteredBookstores` array
- Conditional filtering logic (`All Counties` resets the view)

---

### Card UI Design

Each bookstore is displayed in a uniform-height card containing:

- Name
- Address
- County
- Website button (using `Linking.openURL()`)

Cards use:

- Consistent `minHeight`
- Flexbox layout
- Subtle shadow and rounded corners
- Even spacing in grid format

---
