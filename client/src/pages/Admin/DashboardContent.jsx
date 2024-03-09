import cardImage from '../../assets/dashboardCard.png';

const DashboardContent = () => {
  return (
    <div className="container">
        <div className="d-flex gap-3">
          <div>
            <img src={cardImage} className="img-fluid" />
          </div>
          <div>
            <img src={cardImage} className="img-fluid" />
          </div>
        </div>
    </div>
  )
}

export default DashboardContent