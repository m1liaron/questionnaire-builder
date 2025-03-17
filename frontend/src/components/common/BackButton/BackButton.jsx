import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return <FaArrowLeft cursor="pointer" size={30} onClick={() => navigate(-1)} />
}

export { BackButton };