import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { User } from './interfaces/User'
import Dashboard from './pages/Dashboard'
import UserPage from './pages/UserPage'



function App() {

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)


    // Fetch users from API on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users')
                const data = await response.json()
                setUsers(data.users)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [])

    // Modal functions
    const handleOpenModal = () => setShowModal(true)	
    const handleCloseModal = () => setShowModal(false)

    // Track selected user and open modal
    const handleModalClick = (user: User) => {
        setSelectedUser(user)
        handleOpenModal()
    }

    // Select user and navigate to user page for editing
    const handleEdit = () => {
        if (!selectedUser) return
        navigate(`/user/${selectedUser.id}`)
        handleCloseModal()
        // console.log('Edit button clicked')
    }

    // Delete user from state and close modal
    const handleDelete = () => {
        if (!selectedUser) return
        const updatedUsers = users.filter((user: User) => user.id !== selectedUser.id)
        setUsers(updatedUsers)
        handleCloseModal()
        setSelectedUser(null)
        // console.log('Delete button clicked')
    }

    return (
        <>
        <Routes>
            <Route path="/" element={
                <Dashboard 
                    users={users}
                    handleModalClick={handleModalClick} 
                    showModal={showModal} 
                    handleCloseModal={handleCloseModal} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                />
            } />
            <Route path="/user/:userId" element={
                <UserPage 
                    users={users}
                    setUsers={setUsers}
                    handleDelete={handleDelete}
                />
            } />
        </Routes>
        </>
    );
}

export default App;