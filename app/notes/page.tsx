import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
export default async function Page() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}