const DashboardCard = ({ title, context }) => {
  return (
      <div class="col">
          <div class="card shadow-sm ">
            <div class="card-body">
              <div className="d-flex justify-content-between align-items-center m-auto">
                <p class="card-text text-secondary">{title}</p>
                <div className="bi bi-graph-up-arrow"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center fs-2 fw-semibold">
                {context}
              </div>
            </div>
          </div>
        </div>
  )
}

export default DashboardCard