import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";

import TableTask from "@/Pages/Task/TaskTable";

export default function MyTask({auth,tasks,queryParams = null}){
  return(
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Tasks</h2>
        </div>
      }
    >
      <Head title="My Tasks" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <TableTask tasks={tasks} queryParams={queryParams}/>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
