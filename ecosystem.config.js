module.exports = {
  apps : [
    {
    name   : "crud_application",
    cwd: "./api/crud_application",
    script : "./bin/www"
  },
  {
    name   : "csv_export",
    cwd: "./api/csv_export/",
    script : "./bin/www"
  },
  {
    name   : "proxy",
    cwd: "./api/proxy",
    script : "./bin/www"
  }
]
}
