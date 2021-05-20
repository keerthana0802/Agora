const baseConfig = {
  yellowBox: true,
  reduxLogging: true,
  useReactotron: true,
  appVersion: '1.4.0.0',
  apiBaseURL: 'https://lms-staging.sparkstudio.co/',
  perPageCount: 10
};


const LocalConfig = {
 
};

const StageConfig = {
 
};

const ProdConfig = {
 
};

let useProd = false;
let useDev = false;
if (process.env.BUILD_ENV === 'production') {
  useProd = true;
}
if (process.env.BUILD_ENV === 'development') {
  useDev = true;
}

export default Object.assign(
  baseConfig,
  useProd ? ProdConfig : useDev ? StageConfig : LocalConfig // eslint-disable-line no-nested-ternary
); 
