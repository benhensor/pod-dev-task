import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../interfaces/User'
import ModalAlert from '../components/ModalAlert'


export default function Dashboard() {

    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))

  }, [])

    const handleOpenModal = () => setShowModal(true)	
    const handleCloseModal = () => setShowModal(false)

    const handleModalClick = () => {
        handleOpenModal()
    }

    const handleEdit = () => {
        console.log('Edit button clicked')
    }

    const handleDelete = () => {
        console.log('Delete button clicked')
    }
    return (
        <>
            <section className="bg-gray-300 p-8">
                <div className="w-full max-w-screen-xl m-auto">
                <h1 className="font-bold text-center text-4xl">Pod Dev Task</h1>
                </div>
                <ul>
                {users.map((user: User) => (
                    <li key={user.id} onClick={handleModalClick} className="flex justify-center items-center transition duration-200 ease-in-out hover:scale-105">
                    <div className="flex items-center bg-white w-96 p-4 m-4 rounded-lg shadow-lg">
            
                        <img src={user.image} alt={user.firstName + ' ' + user.lastName} className="w-24 h-24 rounded-full mr-5" />
            
                        <div className="text-center">
                        <h2 className="text-xl font-bold">{user.firstName + ' ' + user.lastName}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
                <ModalAlert show={showModal} onClose={handleCloseModal}>
                    <Link to="user" className="bg-gray-600 text-white w-24 rounded cursor-pointer" onClick={handleEdit}>Edit</Link>
                    <button className="bg-red-700 text-white w-24 rounded cursor-pointer" onClick={handleDelete}>Delete</button>
                </ModalAlert>
            </section>
        </>
    )
}