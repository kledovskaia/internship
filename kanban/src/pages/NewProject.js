import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { createProject } from '../redux/projectsSlice';
import { v4 as uuidv4 } from 'uuid';

export const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (state) => {
    const { payload } = dispatch(
      createProject({
        id: uuidv4(),
        ...state,
      })
    );
    navigate(`/projects/${payload.id}`);
  };

  return <Form type="project" onSubmit={onSubmit} />;
};
