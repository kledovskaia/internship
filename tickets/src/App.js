import { login } from "./firebase/firebase";

export const App = () => {
  return (
    <button onClick={login}>Google Provider</button>
  );
}
