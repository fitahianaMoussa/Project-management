import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";


export default function Edit({auth,user}){
  const {data,setData,post,errors,reset} = useForm({
    email: user.email || '',
    name: user.name || '',
    password : '',
    password_confirmation : '',
    _method : 'PUT',
  })
  const onSubmit = (e) =>{
    e.preventDefault();
    post(route('user.update',user.id));
  }
  return(
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit {user.name}</h2>
        </div>
      }

    >
      <Head title="Edit user" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="">
                <InputLabel htmlFor="user_name" value="User Name"/>
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className="mt-1 block w-full"
                  onChange={(e) =>setData('name',e.target.value)}
                />
                <InputError message={errors.name} className="mt-2 "/>
              </div>
              <div className="">
                <InputLabel htmlFor="user_email" value="User Email"/>
                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) =>setData('email',e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 "/>
              </div>
              <div className="">
                <InputLabel htmlFor="user_password" value="Password"/>
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  onChange={(e) =>setData('password',e.target.value)}
                />
                <InputError message={errors.password} className="mt-2 "/>
              </div>
              <div className="">
                <InputLabel htmlFor="user_password_confirm" value="Password Confirmation"/>
                <TextInput
                  id="user_password_confirm"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={(e) =>setData('password_confirmation',e.target.value)}
                />
                <InputError message={errors.password_confirmation} className="mt-2 "/>
              </div>
              <div className="mt-4 text-right">
                <Link href={route('user.index')} className="bg-red-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-200 mr-2">Cancel</Link>
                <button type="submit" className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600">Update user</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
