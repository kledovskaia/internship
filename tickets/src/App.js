import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./firebase/firebase";
import { addTicket, deleteTicket, updateTicket } from "./redux/thunks";

export const App = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    priority: '',
    id: "TM6vxwBhShly3egUZDnRb",
    author: {
      displayName: "Maddison",
      email: "feirs911@gmail.com",
      id: "5iHASEr2lDO17KFFvono2yIQ7Kh2",
      photoURL: "https://lh3.googleusercontent.com/a/AATXAJzpS1F6-3qdP1pQS3HpsxPEveGE1LQiae2rCfuS=s96-c"
    } 
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTicket(formState.id)) 
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
      <input name="title" value={formState.title} onChange={handleChange}/>
      <input name="description" value={formState.description} onChange={handleChange}/>
      <input name="priority" value={formState.priority} onChange={handleChange}/>
      <button>delete</button>
    </form>
    </>
  );
}
