import { createContext, useState } from "react";

export const TicketIdContext = createContext({});

export const TicketIdContextProvider = ({ children }) => {
  const [ticketId, setTicketId] = useState(null);

  return <TicketIdContext.Provider value={{ticketId, setTicketId}}>
    {children}
  </TicketIdContext.Provider>
}