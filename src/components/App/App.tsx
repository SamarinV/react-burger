import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  OrderFeed,
} from "../../pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter basename="/react-burger">
        <Appheader />
        <main className={styles.main}>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="order-feed" element={<OrderFeed />} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
            {/* <Route path="ingredients/:id" element={<IngredientsPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
