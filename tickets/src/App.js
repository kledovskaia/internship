import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./firebase/firebase";
import { addTicket } from "./redux/thunks";

export const App = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    priority: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTicket(formState))
    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(state => ({
      ...state,
      [name]: value,
    }))
  }

  return (
    <>
    <button onClick={login}>Google Provider</button>
    <form onSubmit={handleSubmit}>
      { Object.entries(formState).map(([name, value]) => <input key={name} name={name} value={value} onChange={handleChange}/>) }
      <button>send</button>
    </form>
    </>
  );
}
