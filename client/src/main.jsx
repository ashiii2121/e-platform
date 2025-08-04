import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import EnhancedSignupPage from "./pages/EnhancedSignupPage";
import DashboardPage from "./pages/DashboardPage";
import SubjectPage from "./pages/SubjectPage";
import PaperViewPage from "./pages/PaperViewPage";
import PricingPage from "./pages/PricingPage";
import VideoTutorialPage from "./pages/VideoTutorialPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <EnhancedSignupPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "subject/:subjectId", element: <SubjectPage /> },
      { path: "subject/:subjectId/paper/:paperId", element: <PaperViewPage /> },
      { path: "payment", element: <PricingPage /> },
      { path: "videos", element: <VideoTutorialPage /> },
      { path: "terms", element: <TermsOfServicePage /> },
      { path: "privacy", element: <PrivacyPolicyPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
