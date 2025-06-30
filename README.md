# React Native Chat Screen – Assignment

This is a React Native hybrid chat screen application developed as part of a frontend assignment. The app replicates a real-time messaging UI and fetches paginated chat data from a public API. It is fully compatible with both Android and iOS platforms.

## 📱 Project Overview

The project mimics a WhatsApp-style chat screen. Messages are fetched from the given API and displayed in a scrollable chat interface, with support for pagination, custom headers, and styled chat bubbles.

### ✨ Features

- 📥 Loads the **most recent messages first**
- 🔄 **Infinite scroll** to load older messages on scroll-up
- 🧭 **Chat header** with:
  - Trip title: "Trip 1"
  - Route info: IGI Airport, T3 → Sector 28
  - Member profile images
  - 3-dot menu with options: Members, Share Number, Report
- 💬 **Chat bubbles** styled differently for own vs other users' messages
- 📆 Static **date separator** between chat groups
- 📝 Input bar with:
  - Mention text (`@Name`)
  - Icons for camera, video call, and file
  - Send button (UI only, non-functional)

## 🔗 API Used

Chat data is fetched from the following public API:
```
https://qa.corider.in/assignment/chat?page=0
```
Pagination is handled by incrementing the `page` query parameter (`?page=1`, `?page=2`, etc.).

## 🛠️ Tools & Technologies

- **React Native (Expo)**
- **Axios** – for API requests
- **React Navigation** – for screen layout and navigation
- **FlatList** – for rendering chat messages
- **React Native Modal** – for dropdown/menu interactions
- **Expo Vector Icons** – for input and menu icons
- **JavaScript / TypeScript**

## 🚀 Getting Started

### Prerequisites

- Node.js
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
git clone https://github.com/ayushchhanchar/coRider-assigment.git
cd coRider-assigment
npm install
npx expo start
```

Use the Expo Go app on your mobile device to scan the QR code and run the application.

## 🎥 Demo

A screencast video demonstrating the chat application running on a mobile device is included in this repository.

## 📄 License

This project is developed strictly for educational and assignment purposes.
