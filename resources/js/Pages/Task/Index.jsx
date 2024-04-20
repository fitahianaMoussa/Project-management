import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";

import TableTask from "@/Pages/Task/TaskTable";

export default function Index({auth,tasks,queryParams = null,success}){
  return(
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All Tasks</h2>
          <Link className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" href={route('task.create')}>Add new</Link>
        </div>
      }
    >
      <Head title="All Tasks" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>)}
           <TableTask tasks={tasks} queryParams={queryParams}/>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
