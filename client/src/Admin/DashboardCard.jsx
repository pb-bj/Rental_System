const DashboardCard = ({ title, context }) => {
  return (
      <div class="col">
          <div class="card shadow-sm ">
            <div class="card-body">
              <p class="card-text fw-semibold">{title}</p>
              <div class="d-flex justify-content-between align-items-center">
                {context}
              </div>
            </div>
          </div>
        </div>
  )
}

export default DashboardCard