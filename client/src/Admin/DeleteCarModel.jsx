import { toast } from "react-hot-toast";
import { deleteCarItem } from "../api/cars";
import { useFetchCars } from "../contexts/CarContext";
import { useAuth } from '../contexts/AuthContext';

const DeleteCarModel = ({ onCloseModel, deleteId }) => {
    const { fetchAllCars } = useFetchCars();
    const { authToken } = useAuth();

    const handleConfirmDelete = async () => {
        const deleteResult = await deleteCarItem(deleteId, authToken.token);
        fetchAllCars();
        onCloseModel(false);
        toast.success('Deleted Successfully');

        if (!deleteResult) {
            return toast.error('Something went wrong');
        }
    }

    return (
        <div className="modal d-flex justify-content-center align-items-center m-auto" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ width: "350px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to delete?</h5>
                    </div>
                    <div className="modal-body">
                        <div className="input-grp text-center">
                            <button className="btn btn-success w-25 me-1" onClick={handleConfirmDelete}>Confirm</button>
                            <button className="btn btn-danger w-25" onClick={() => onCloseModel(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteCarModel;