import { initialTickets } from './initialTickets';

export const seed = (app) => {
  initialTickets.forEach(ticket => {
    app.firestore().collection('tickets').add(ticket)
  })
}