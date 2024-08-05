import './App.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const POSTS = [
  { id: 1, title: 'POST1' },
  { id: 2, title: 'POST2' },
]

function App() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    // queryFn: () => Promise.reject('Field to get data!')
    queryFn: () => wait(1000).then(() => [...POSTS])
    // queryFn: async () => {
    //   const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    //   return response.data;
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      {
        <ul>
          {postsQuery.data.map((user, index) => <li key={index}>{user.title}</li>)}
        </ul>
      }
    </div>

  );
}

const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App;
