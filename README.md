 # URL Shortener

A simple, lightweight URL shortening service built with Node.js, Express, and MongoDB. This project allows users to shorten long URLs into concise, shareable links and redirect to the original URLs using the shortened versions.

## Features

- Shorten long URLs into compact, unique links.
- Redirect users to the original URL using the shortened link.
- Simple and intuitive RESTful API for creating and accessing shortened URLs.
- MongoDB integration for persistent storage of URL mappings.
- Basic click tracking for shortened URLs.

url-shortner/
├── models/           # MongoDB schema definitions
│   └── Url.js
├── routes/           # Route handlers for API endpoints
│   └── index.js
├── .env              # Environment variables file
├── package.json      # Project metadata and dependencies
├── server.js         # Main application entry point
└── README.md         # Project documentation



## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: None (API-driven, can be integrated with any frontend)
- **Environment**: Managed via `.env` file for configuration

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version 16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm (Node Package Manager)

## Installation

### Clone the Repository
git clone https://github.com/shhbhm/url-shortner.git
cd url-shortner
