import { createServerSupabaseClient } from '@/lib/server/server';

export default async function Page() {
  const supabase = createServerSupabaseClient();

  const { data: posts, error } = await supabase.from('users').select('*');

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {error ? (
          <div>Oh no! {error.message}</div>
        ) : (
          <div>
            <ul>{posts?.map((post) => <li key={post.id}>{post.email}</li>)}</ul>
          </div>
        )}
      </p>
    </div>
  );
}
