import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { User } from "../interfaces/User"

// Define the UserPage component
type UserPageProps = {
    handleDelete: () => void
}

export default function UserPage({ handleDelete }: UserPageProps) {

    const navigate = useNavigate()

    const { userId } = useParams<{ userId: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [formValues, setFormValues] = useState<User | null>(null)

    // Fetch the user data from the API on component mount
    useEffect(() => {
        const fetchUser = async  () => {
        try {
            const response = await fetch(`https://dummyjson.com/user/${userId}`)
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.error(error)
        }
        }

        if (userId) fetchUser()
    }, [userId])

    // Update the form values when the user data changes
    useEffect(() => {
        setFormValues(user)
    }, [user])

    // Update form values when input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormValues(prevValues => {
            if (!prevValues) return null;
    
            switch (name) {
                case 'firstName':
                    return { ...prevValues, firstName: value }
                case 'lastName':
                    return { ...prevValues, lastName: value }
                case 'email':
                    return { ...prevValues, email: value }
                case 'phone':
                    return { ...prevValues, phone: value }
                case 'address.address':
                    return { ...prevValues, address: { ...prevValues.address, address: value } }
                case 'address.city':
                    return { ...prevValues, address: { ...prevValues.address, city: value } }
                case 'address.postalCode':
                    return { ...prevValues, address: { ...prevValues.address, postalCode: value } }
                case 'address.state':
                    return { ...prevValues, address: { ...prevValues.address, state: value } }
                default:
                    return prevValues; 
            }
        });
    }

    // Update user data on form submit 
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formValues) return

        fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
        .then(res => res.json())
        .then(data => {
            console.log('User updated:', data)
            setUser(data)
        });
    }

    // Delete user
    const handleDeleteClick = () => {
        handleDelete()
        navigate('/')
    }

    // Define form field classes to reduce repetition
    const formFieldClasses = 'flex flex-col items-left mb-4'
    const labelClasses = 'block text-gray-700 text-sm font-bold'
    const inputClasses = 'input border-gray-300 rounded-sm font-bold'

    return (
        <>
            <section className="bg-gray-300 p-8">
                <div className="flex flex-col items-center w-full max-w-screen-xl m-auto">

                    <h1 className="font-bold text-center text-4xl mb-8">User Page</h1>
                    {user ? (
                        <form className="flex flex-col items-left bg-white w-96 p-8 rounded-lg shadow-lg mb-10" onSubmit={handleSubmit}>
                            <div className={formFieldClasses}>
                                <label htmlFor="avatar" className={labelClasses}>Avatar:</label>
                                <img src={user.image} alt={user.firstName + ' ' + user.lastName} className="w-24 h-24 rounded-full mr-5" />
                            </div>
                            
                            <div>
                                <div className={formFieldClasses}>
                                    <label htmlFor="firstName" className={labelClasses}>First Name:</label>
                                    <input
                                    type="text"
                                    name="firstName"
                                    value={formValues?.firstName || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                </div>
                                <div className={formFieldClasses}>
                                    <label htmlFor="lastName" className={labelClasses}>Last Name:</label>
                                    <input
                                    type="text"
                                    name="lastName"
                                    value={formValues?.lastName || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                </div>
                                <div className={formFieldClasses}>
                                    <label htmlFor="email" className={labelClasses}>Email:</label>
                                    <input
                                    type="email"
                                    name="email"
                                    value={formValues?.email || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                </div>
                                <div className={formFieldClasses}>
                                    <label htmlFor="phone" className={labelClasses}>Phone:</label>
                                    <input
                                    type="text"
                                    name="phone"
                                    value={formValues?.phone || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                </div>
                                <div className={formFieldClasses}>
                                    <label htmlFor="address" className={labelClasses}>Address:</label>
                                    <input
                                    type="text"
                                    name="address"
                                    value={formValues?.address.address || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                    <input
                                    type="text"
                                    name="address"
                                    value={formValues?.address.city || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                    <input
                                    type="text"
                                    name="address"
                                    value={formValues?.address.postalCode || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                    <input
                                    type="text"
                                    name="address"
                                    value={formValues?.address.state || ''}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="text-center bg-gray-600 text-white w-48 rounded cursor-pointer mb-4">Update User</button>
                            <button type="button" className="text-center bg-red-700 text-white w-48 rounded cursor-pointer" onClick={handleDeleteClick}>Delete User</button>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                <button className="text-center bg-gray-600 text-white w-24 rounded cursor-pointer">
                    <Link to="/">Back</Link>
                </button>
                </div>
            </section>
        </>
    )
}