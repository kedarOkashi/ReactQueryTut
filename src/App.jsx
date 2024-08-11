import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';

const POSTS = [
  { id: 1, title: 'POST ONE' },
  { id: 2, title: 'POST TWO' },
  { id: 3, title: 'POST Three' },
  { id: 3, title: 'POST Three' },
  { id: 3, title: 'POST Three' },
  { id: 3, title: 'POST Three' },
  { id: 3, title: 'POST Three' },
  { id: 3, title: 'POST Three' },
]

function App() {

  // /posts => ["posts"]
  // /posts/1 => ["posts", post.id]
  // /posts?authorId=1 => ["posts",{authorId:1}]
  // /posts/2/comments => ["posts",post.id,"comments"]


  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    // queryFn: () => Promise.reject('Field to get data!')
    queryFn: ({ queryKey }) => wait(1000).then(() => [...POSTS], console.log(queryKey)),
    // refetchInterval: 5000,
    //staleTime:1000
    // queryFn: async () => {
    //   const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    //   return response.data;
  })


  const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(2000).then(() => POSTS.push({ id: 10, title }), console.log("mutation"))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })

  useEffect(() => { console.log("component did mount") }, [])

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      {
        postsQuery.data.map((post, index) => <p key={index}>[key={post.id}] [Post={post.title}]</p>)
      }
      <button disabled={newPostMutation.isPending} onClick={() => newPostMutation.mutate("New POST")}>Add New</button>
    </div>
  );
}

const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App;
