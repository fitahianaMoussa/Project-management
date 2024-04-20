import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/Constante.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";


export default function TableTask({tasks,queryParams = null, hideProjectColumn = false}){
  queryParams = queryParams || {}
  const searchFieldChanged = (name,value)=>{
    if(value){
      queryParams[name] = value
    }else{
      delete queryParams[name]
    }

    router.get(route('task.index'), queryParams)
  }

  const onKeyPress = (name,e) => {
    if(e.key !== 'Enter') return;
    searchFieldChanged(name,e.target.value);
  }

  const sortChanged = (name) => {
    if(name === queryParams.sort_field){
      if(queryParams.sort_direction === 'asc'){
        queryParams.sort_direction = 'desc'
      }else{
        queryParams.sort_direction = 'asc'
      }
    }else{
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    router.get(route('task.index'), queryParams)
  }

  const deleteTask = async (task) => {
    if (window.confirm('Are you sure you want to delete the task?')) {
      try {
        const response = await router.delete(route('task.destroy', task.id));
        if (response && response.ok) {
          console.log('Task deleted successfully');
        } else {
          console.error('Error deleting task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return(
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 upercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th onClick={e => sortChanged("id")} className="px-3 py-2">ID</th>
            <th onClick={e => sortChanged("image")} className="px-3 py-2">Images</th>
            {!hideProjectColumn && (<th onClick={e => sortChanged("name")} className="px-3 py-2">Project Name</th>)}
            <th onClick={e => sortChanged("name")} className="px-3 py-2">Task Name</th>
            <th onClick={e => sortChanged("status")} className="px-3 py-2">Status</th>
            <th onClick={e => sortChanged("created_at")} className="px-3 py-2">Create Date</th>
            <th onClick={e => sortChanged("due_date")} className="px-3 py-2">Due Date</th>
            <th  className="px-3 py-2">Created By</th>
            <th  className="px-3 py-2 text-right">Actions</th>
          </tr>
          </thead>
          <thead className="text-xs text-gray-700 upercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            {!hideProjectColumn && (<th className="px-3 py-2"></th>)}
            <th className="px-3 py-2">
              <TextInput
                defaultValue={queryParams.name}
                className="w-full"
                placeholder="Task Name"
                onBlur={e => searchFieldChanged('name',e.target.value)}
                onKeyPress = {e=> onKeyPress('name',e)}
              />
            </th>
            <th className="px-3 py-2">
              <SelectInput
                defaultValue={queryParams.status}
                className="w-full"
                onChange={e=>searchFieldChanged('status',e.target.value)}
              >
                <option value="">Select Statuts</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
          </tr>
          </thead>
          <tbody >
          {tasks.data.map((task) => (
            <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} style={{width:60}}/>
              </td>
              {!hideProjectColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
              <td className="px-3 py-2 text-gray-100 hover:underline">
                <Link href={route('task.show',task.id)}>
                  {task.name}
                </Link>
              </td>
              <td className="px-3 py-2"><span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span></td>
              <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
              <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2">
                <Link href={route('task.edit',task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                <button
                  onClick={(event) => deleteTask(task)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </div>
  )
}
