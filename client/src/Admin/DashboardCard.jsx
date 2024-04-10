const DashboardCard = ({ title, context }) => {
  return (
    <div className="col">
      <div className="card shadow-sm ">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center m-auto">
            <p className="card-text text-secondary">{title}</p>
            <div className="bi bi-graph-up-arrow"></div>
          </div>
          <div className="d-flex justify-content-between align-items-center fs-2 fw-semibold">
            {context}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard