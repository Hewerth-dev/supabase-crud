import { supabase } from "@/lib/supabaseClient";

export async function getTasks() {
    const {data , error} = await supabase.from('tasks').select('*');
    if (error) throw error
    console.log(data)
    return data
} 
export async function addTask(title: string) {
    const { data, error } = await supabase.from("tasks").insert([{ title, completed: false }]).select();
    if (error) throw error;
    return data;
  }

export async function updateTask(id:number, completed:boolean) {
    const {data, error} = await supabase.from('tasks').update({completed}).eq('id', id)
    if (error) throw error
    return data
}

export async function deleteTaskById(id:number){
    const {data, error} = await supabase.from('tasks').delete().eq('id',id)
    if(error) throw error
    return data
}