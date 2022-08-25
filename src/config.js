var serverUrl;
if (process.env.NODE_ENV === 'development') {
  serverUrl = 'http://localhost:8081/';
} else if (process.env.NODE_ENV === 'production') {
  serverUrl = '/';
}

export {
  serverUrl,
};