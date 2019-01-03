// Inspired by https://daveceddia.com/multiple-environments-with-react/

const hostname = window && window.location && window.location.hostname;
const port = process.env.METRIC_TEACHER_SERVER_BACKEND_PORT || "4000";

let API_ROOT;

// Figure out the full host root.
if (process.env.METRIC_TEACHER_SERVER_BACKEND_HOST) {
  API_ROOT = `${process.env.METRIC_TEACHER_SERVER_BACKEND_HOST}:${port}`;
} else if (/amazonaws.com$/.test(hostname)) {       // AWS testing
  API_ROOT = `${hostname}:${port}`;
} else if (/dev.metric-teacher.com$/.test(hostname)) {  // First domain name (dev)
  API_ROOT = `${hostname}:${port}`;
} else if (/metric-teacher.com$/.test(hostname)) {      // First domain name (prod)
  API_ROOT = "api.metric-teacher.com";
} else if (/dev.metricteacher.app$/.test(hostname)) {   // Second domain name (dev)
  API_ROOT = `${hostname}:${port}`;
} else if (/metricteacher.app$/.test(hostname)) {       // Second domain name (prod)
  API_ROOT = "api.metricteacher.app";
} else if (/^192\.168\.1\./.test(hostname)) {           // Local network testing
  API_ROOT = `${hostname}:${port}`;
} else if (/^10\.0\.0\./.test(hostname)) {              // Local network testing
  API_ROOT = `${hostname}:${port}`;
} else {                                                // Local machine testing
  API_ROOT = `localhost:${port}`;
}

export default API_ROOT;
