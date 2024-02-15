type ModalAlertProps = {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
};


export default function ModalAlert({ show, onClose, children }: ModalAlertProps) {
    if (!show) return null;
    return (
        <div onClick={onClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="flex gap-10 bg-white p-8 rounded-lg">
                {children}
            </div>
        </div>
    )
}