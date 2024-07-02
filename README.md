### The Guardian News - Project Setup Guide

**Website Name:** The Guardian News  
**Admin Email:** user1@gmail.com  
**Password:** 123456Aa  
**Live Link:** [The Guardian News](https://the-guirdian-news.netlify.app/)

---

### 🛠️ Technical Stack:

- **Frontend:** React, Firebase, React Router
- **Backend:** Node.js, Express, MongoDB
- **Payment Gateway:** Stripe
- **Additional Libraries:** 
  - Tanstack Query for data fetching
  - React-Select for multi-select dropdowns
  - Imgbb/Cloudinary for image uploads
  - React-Google-Charts for dynamic charts

**Packages:**

1. **React-Tooltip:** [React Tooltip Documentation](https://react-tooltip.com/)
2. **Swiper (Slider):** [Swiper Documentation](https://swiperjs.com/)
3. **React-Simple-Typewriter:** [React Simple Typewriter Documentation](https://www.npmjs.com/package/react-simple-typewriter)
4. **Meraki UI:** [Meraki UI Documentation](https://merakiui.com/)

### 📋 Features:

1. **Comprehensive Coverage**: Extensive coverage on politics, culture, sports, and more.
2. **Timely Updates**: Real-time news updates for breaking news.
3. **User-Friendly Interface**: Clean, intuitive design with easy navigation.
4. **In-Depth Analysis**: In-depth analysis and investigative journalism.
5. **Interactive Features**: Includes polls, comment sections, and multimedia content.
6. **Mobile Accessibility**: Optimized for mobile devices for seamless reading on-the-go.

---

### 🚀 Project Setup Instructions

Follow these steps to set up the project locally:

#### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Firebase Account**: [Create Firebase Account](https://firebase.google.com/)
- **Stripe Account**: [Create Stripe Account](https://stripe.com/)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/the-guirdian-news.git
cd the-guirdian-news
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Stripe
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Image Uploads
IMGBB_API_KEY=your_imgbb_api_key
CLOUDINARY_URL=your_cloudinary_url
```

#### 4. Start the Backend Server

Navigate to the `backend` directory and start the server:

```bash
cd backend
npm install
npm start
```

#### 5. Start the Frontend Server

Navigate back to the root directory and start the frontend server:

```bash
npm start
```

#### 6. Access the Application

Open your browser and go to `http://localhost:3000` to access the application.

#### 7. Admin Access

Use the following credentials to log in to the admin panel:

- **Email:** user1@gmail.com
- **Password:** 123456Aa

