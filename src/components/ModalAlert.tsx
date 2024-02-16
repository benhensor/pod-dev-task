// Desc: This file contains the ModalAlert component which is used to show the alert modal for edit and delete user buttons
type ModalAlertProps = {
	show: boolean;
	onClose: () => void;
	handleEdit: () => void;
	handleDelete: () => void;
};

export default function ModalAlert({
	show,
	onClose,
	handleEdit,
	handleDelete,
}: ModalAlertProps) {

    // If the show prop is false, return null
	if (!show) return null;
	return (
		<div
			onClick={onClose}
			className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
		>
			<div
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    // Prevent the event from bubbling up to the parent element
					e.stopPropagation()
				}
				className="flex flex-col items-center w-1/5 gap-4 bg-white p-8 rounded-lg"
			>
				<button
					className="text-center bg-gray-600 text-white w-48 p-1 rounded cursor-pointer"
					onClick={handleEdit}
				>
					Edit User
				</button>
				<button
					className="text-center bg-red-700 text-white w-48 p-1 rounded cursor-pointer"
					onClick={handleDelete}
				>
					Delete User
				</button>
			</div>
		</div>
	);
}
