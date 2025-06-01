// pages/dashboard.js
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user}</p>
      <p>Access Token: {session.accessToken}</p>
    </div>
  );
}
