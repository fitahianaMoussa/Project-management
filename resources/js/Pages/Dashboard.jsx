import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth,pendingTask,myPendingTask,inProgressTask,myProgressTask ,completedTask,myCompletedTask,activeTasks}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3  gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 text-2xl font-semibold">Pending Tasks</h3>
                          <p className="text-xl mt-4">
                            <span className="mr-2">{myPendingTask}</span>/<span className="ml-2">{pendingTask}</span>
                          </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                      <h3 className="text-blue-500 text-2xl font-semibold">In Progress Tasks</h3>
                      <p className="text-xl mt-4">
                        <span className="mr-2">{myProgressTask}</span>/<span className="ml-2">{inProgressTask}</span>
                      </p>
                    </div>
                  </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                      <h3 className="text-green-500 text-2xl font-semibold">Completed Tasks</h3>
                      <p className="text-xl mt-4">
                        <span className="mr-2">{myCompletedTask}</span>/<span className="ml-2">{completedTask}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100  ">
                    <h3 className="text-gray-100 text-xl font-semibold mb-4">My Active Tasks</h3>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 upercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                          <th className="px-3 py-3">ID</th>
                          <th className="px-3 py-3">Project Name</th>
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Status</th>
                          <th className="px-3 py-3">Due Date</th>
                        </tr>
                      </thead>
                      <tbody>

                          {activeTasks.data.map((task)=>(
                            <tr key={task.id}>
                              <td className="px-3 py-3">{task.id}</td>
                              <td className="px-3 py-3">
                                <Link className="text-gray-200 hover:underline" href={route('project.show',task.project_id)}>{task.project.name}</Link>
                              </td>
                              <td className="px-3 py-3">
                                <Link className="text-gray-200 hover:underline" href={route('task.show',task.id)}>{task.name}</Link>
                              </td>
                              <td className="px-3 py-3 text-nowrap">{task.status}</td>
                              <td className="px-3 py-3 text-nowrap">{task.due_date}</td>
                            </tr>
                          ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
