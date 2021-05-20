import apisauce from 'apisauce';
// import qs from 'qs'

import Config from '../../Config/AppConfig';

const create = (baseURL = Config.apiBaseLoginURL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    timeout: 10000
  });

  api.addResponseTransform((response) => {
    response.data = response.data || {};

    if (
      !response.ok &&
      response.problem &&
      (response.problem === apisauce.TIMEOUT_ERROR ||
        response.problem === apisauce.NETWORK_ERROR ||
        response.problem === apisauce.CONNECTION_ERROR)
    ) {
      let message = '';
      switch (response.problem) {
        case apisauce.TIMEOUT_ERROR:
          message = 'Internet connectivity is bad. Try again later.';
          break;
        case apisauce.NETWORK_ERROR:
          message = 'Please connect to network and try again later.';
          break;
        case apisauce.CONNECTION_ERROR:
          message = 'connectionErrorMessage';
          break;
        default:
          break;
      }
      response.data.error = {
        code: -1,
        message
      };
    }
  });

  const profile = ({ params }) => api.get('/web/v1/me', {}, {});
  const oauthLogout = (token, params, clientId = Config.OAuth.clientId) => {
    let path = `/oauth/revoke?client_id=${clientId}&token=${token}`;
    return api.post(path, params, {}, {});
  };
  return {
    setHeader: api.setHeader,
    profile,
    oauthLogout
  };
};
export default {
  create
};
