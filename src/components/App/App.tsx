import styles from "./App.module.css";
import Appheader from "../AppHeader/AppHeader";
import Main from "../Main/Main";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.headerWrapper}>
        <Appheader />
      </div>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Main />
        </div>
      </main>
    </div>
  );
}

export default App;
