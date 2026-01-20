# Clarifai Backend (Face Detection)

Simple backend service for handling [**AI face detection**](https://github.com/leonyangela/face-recog) using the **Clarifai API**.  
This server securely processes image URLs and returns face detection data to the frontend.

---

## Tech Stack

- Node.js
- Express.js
- Clarifai API

---

## Setup

1. Clone the repository
```
git clone https://github.com/your-username/clarifai-backend.git
cd clarifai-backend
npm install
```

2. Create a `.env` file
```
CLARIFAI_PAT=your_clarifai_pat
CLARIFAI_USER_ID=your_clarifai_userid
CLARIFAI_APP_ID=your_clarifai_appid
PORT=3000
```

3. Start
```
npm start
```
Server runs on http://localhost:your_port

----

## API Endpoint
POST `/api/face-detection`
Request
```
{
  "imageUrl": "https://example.com/image.jpg"
}
```
Response
```
{
  "regions": [...]
}
```

## Purpose
- Keeps Clarifai API keys secure
- Handles AI face detection requests
- Acts as a bridge between frontend and Clarifai

