// endpoints: api/posts

const BASE_URL = 'http://localhost:3000/api/posts';

export default async function getPost(id) {
  const res = await fetch(`${BASE_URL}`);
  const posts = await res.json();

  if(id) {
    return posts.find(value => value.id === id);
  }

  return posts;
}