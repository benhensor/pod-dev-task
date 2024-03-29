import { User } from '../interfaces/User'
import ModalAlert from '../components/ModalAlert'

// Define the Dashboard component
type DashboardProps = {
    users: User[];
    handleModalClick: (user: User) => void;
    showModal: boolean;
    handleCloseModal: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
};

export default function Dashboard({ users, handleModalClick, showModal, handleCloseModal, handleEdit, handleDelete }: DashboardProps) {

    return (
        <>
            <section className="bg-gray-300 py-8 px-4">

                <div className="w-full max-w-screen-xl m-auto">
                    <h1 className="font-bold text-center text-4xl mb-2">Pod Dev Task</h1>
                    <h2 className="font-bold text-center text-2xl mb-8">Welcome to the Dashboard!</h2>
                </div>

                <ul>
                {users.map((user: User) => (
                    <li key={user.id} onClick={() => handleModalClick(user)} className="flex justify-center items-center transition duration-200 ease-in-out hover:scale-105">
                    <div className="flex items-center bg-white w-96 p-4 mb-4 rounded-lg shadow-lg">
            
                        <img src={user.image} alt={user.firstName + ' ' + user.lastName} className="w-20 h-20 rounded-full mr-5" />
            
                        <div className="text-left">
                        <h2 className="text-xl font-bold">{user.firstName + ' ' + user.lastName}</h2>
                        <p className="text-sm text-gray-500 md:text-base">{user.email}</p>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>

                <ModalAlert 
                    show={showModal} 
                    onClose={handleCloseModal} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                />

            </section>
        </>
    )
}