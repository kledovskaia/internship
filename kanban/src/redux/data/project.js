import { v4 as uuidv4 } from 'uuid';

export const project = {
  id: uuidv4(),
  title: 'International',
  issueBoards: [
    [
      {
        index: 0,
        id: uuidv4(),
        title: 'As a translator, I want integrate Crowdin webhook to notify translators about changed strings',
        priority: 'Major',
        points: '2',
      },
      {
        index: 1,
        id: uuidv4(),
        title: 'As a user, I want to see actual overusage price for next download',
        priority: 'Unknown',
        points: '1',
      },
      {
        index: 2,
        id: uuidv4(),
        title: 'As a team license owner, I want to use multiplied limits',
        priority: 'Unknown',
        points: '2',
      },
      {
        index: 3,
        id: uuidv4(),
        title: 'Font SCSS mixin does not recognise fallback for font-family',
        priority: 'Major',
        points: '3',
      },
      {
        index: 3,
        id: uuidv4(),
        title: 'Interate nuxt-18n in product-developers project',
        priority: 'Major',
        points: '5',
      },
    ],
    [
      {
        index: 0,
        id: uuidv4(),
        title: 'As an external contributor, I want to be able to see priority of uploaded materials',
        priority: 'Minor',
        points: '3',
      },
      {
        index: 1,
        id: uuidv4(),
        title: 'Replace JustComments with something',
        priority: 'Critical',
        points: '3',
      },
      {
        index: 2,
        id: uuidv4(),
        title: 'As manual licensed User, I want to see my limits',
        priority: 'Unknown',
        points: '2',
      },
      {
        index: 3,
        id: uuidv4(),
        title: 'Create a storage to store common translations',
        priority: 'Major',
        points: '5',
      },
      {
        index: 4,
        id: uuidv4(),
        title: 'CLONE - As an external contributor, I want to be able to upload a zip of my original materials',
        priority: 'Minor',
        points: '2',
      },
    ],
    [
      {
        index: 0,
        id: uuidv4(),
        title: 'As a user, I want to access Intercom help center, so that I am not confused by Crisp',
        priority: 'Normal',
        points: '1',
      },
      {
        index: 1,
        id: uuidv4(),
        title: 'Remove requests to ipfy service from frontend',
        priority: 'Critical',
        points: '2',
      },
    ],
    [
      {
        index: 0,
        id: uuidv4(),
        title: 'As a user, I want to access Intercom help center, so that I am not confused by Crisp',
        priority: 'Normal',
        points: '1',
      },
      {
        index: 1,
        id: uuidv4(),
        title: 'Remove requests to ipfy service from frontend',
        priority: 'Critical',
        points: '2',
      },
    ],
  ],
};
