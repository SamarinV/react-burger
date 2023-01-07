import styles from "./App.module.css";
import Appheader from "./components/AppHeader/AppHeader";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.headerWrapper}>
        <Appheader />
      </div>
      <main className={styles.main}>
        <div style={{ display: "flex" }}>
          <Main />
        </div>
      </main>
    </div>
  );
}

export default App;
