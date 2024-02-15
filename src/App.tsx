import { useEffect, useState } from 'react'
import { User } from './interfaces/User'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))

  }, [])

  return (
    <>
      <section className="p-8">

        <div className="w-full max-w-screen-xl m-auto">
          <h1 className="font-bold text-center text-4xl">Pod Dev Task</h1>
        </div>

        <ul>

          {users.map((user: User) => (

            <li key={user.id} className="flex justify-center items-center">
              <div className="bg-white w-96 p-4 m-4 rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                  <img src={user.image} alt={user.firstName + '' + user.lastName} className="w-24 h-24 rounded-full" />
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold">{user.firstName + ' ' + user.lastName}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
            </li>

          ))}

        </ul>
      </section>
    </>
  );
}

export default App;