import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";


export default function Index({auth,users,queryParams = null, success}){
  queryParams = queryParams || {}
  const searchFieldChanged = (name,value)=>{
    if(value){
      queryParams[name] = value
    }else{
      delete queryParams[name]
    }

    router.get(route('user.index'), queryParams)
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
    router.get(route('user.index'), queryParams)
  }

  const deleteUser = async (user) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      try {
        const response = await router.delete(route('user.destroy', user.id));
        if (response && response.ok) {
          console.log('User deleted successfully');
        } else {
          console.error('Error deleting user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  return(
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>
          <Link className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" href={route('user.create')}>Add new</Link>
        </div>
      }

    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>)}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 upercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th onClick={e => sortChanged("id")} className="px-3 py-2">ID</th>
                    <th onClick={e => sortChanged("image")} className="px-3 py-2">Email</th>
                    <th onClick={e => sortChanged("name")} className="px-3 py-2">Name</th>
                    <th onClick={e => sortChanged("created_at")} className="px-3 py-2">Create Date</th>
                    <th  className="px-3 py-2 text-right">Actions</th>
                  </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 upercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                      <TextInput
                        defaultValue={queryParams.email}
                        className="w-full"
                        placeholder="User Email"
                        onBlur={e => searchFieldChanged('email',e.target.value)}
                        onKeyPress = {e=> onKeyPress('email',e)}
                      />
                    </th>
                    <th className="px-3 py-2">
                      <TextInput
                        defaultValue={queryParams.name}
                        className="w-full"
                        placeholder="User Name"
                        onBlur={e => searchFieldChanged('name',e.target.value)}
                        onKeyPress = {e=> onKeyPress('name',e)}
                      />
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                  </thead>
                  <tbody >
                  {users.data.map((user) => (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2 text-nowrap">{user.email}</td>
                      <td className="px-3 py-2 text-gray-100 text-nowrap">
                          {user.name}
                      </td>
                      <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                      <td className="px-3 py-2">
                        <Link href={route('user.edit',user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                        <button
                          onClick={(event) => deleteUser(user)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
