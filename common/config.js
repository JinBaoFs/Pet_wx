const ENV = process.env.NODE_ENV

const config = {
  development: {
    baseUrl: '/api'
  },
  production: {
    baseUrl: 'https://api.example.com'
  }
}

export default config[ENV]