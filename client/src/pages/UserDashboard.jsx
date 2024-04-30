import { useAuth } from "../contexts/AuthContext";

const UserDashboard = () => {
  const { authData } = useAuth();

  return (
    <section className='container' style={{ marginTop: '95px' }}>
      <h5>Hi, {authData?.fullname}</h5>
    </section>
  )
}

export default UserDashboard