import React from 'react';
import useFetchTickets from './hooks/useFetchTickets';
import KanbanBoard from './components/kanbanBoard';

function App() {
  const {tickets, loading, error} = useFetchTickets();
  console.log(tickets);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <KanbanBoard tickets={tickets.tickets} users={tickets.users} />
    </div>
  );
}

export default App;
