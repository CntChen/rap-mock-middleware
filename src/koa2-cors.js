/**
 * KOA2 CORS middleware
 *
 * author: CntChen
 * date: 2016-12-20
 * reference: https://www.w3.org/TR/cors/#resource-processing-model
 */


let CorsOptions = {
  allowOrigins: null,
  allowMethods: null,
  allowHeaders: null,
  allowExposedHeaders: null,
  maxAge: undefined,
  isSupportCredentials: true,
}

let debugOptions = {
  outputLog: false,
};

/**
 * generator for koa cors middleware
 * 
 * @param  {Object} options 
 * @param  {Array} options.allowOrigins
 * @param  {Array} options.allowMethods
 * @param  {Array} options.allowHeaders
 * @param  {Array} options.allowExposedHeaders
 * @param  {Number} options.maxAge
 * @param  {Boolean} options.isSupportCredentials  
 * @return {async Function} function as koa middleware
 */
function GetKoaCors(options){
  Object.assign(CorsOptions, options);

  return KoaV2CORS;
}

const KoaV2CORS = async function KoaV2CORS(ctx, next){
  try{
    if(next){
      await next();
    }

    // valify options
    if (!( CorsOptions.allowOrigins === null || Array.isArray(CorsOptions.allowOrigins))
      || !( CorsOptions.allowMethods === null || Array.isArray(CorsOptions.allowMethods))
      || !( CorsOptions.allowHeaders === null || Array.isArray(CorsOptions.allowHeaders))
      || !( CorsOptions.allowExposedHeaders === null || Array.isArray(CorsOptions.allowExposedHeaders))
      || !( CorsOptions.maxAge === undefined || typeof CorsOptions.maxAge === 'number')
      || !(typeof CorsOptions.isSupportCredentials === 'boolean')) {
      throw new Error('options param error.');
    }

    // all headers is lowercase
    const reqHeaders = ctx.headers;
    let CORSResponseHeaders = {};    

    const requestOrigin = reqHeaders['origin'];
    // reference 6.1.1 & 6.2.1
    if(!requestOrigin){
      finishedWithoutSetHeaders();
      return;
    }

    // reference 6.1.2 & 6.2.2
    if (CorsOptions.allowOrigins && !CorsOptions.allowOrigins.includes(requestOrigin)) {
      finishedWithoutSetHeaders();
      return;
    }

    // is simple request
    if(!ctx.method == 'OPTIONS'){
      // reference 6.1.3
      if (CorsOptions.isSupportCredentials) {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Origin': reqHeaders['origin'],
          'Access-Control-Allow-Credentials': 'true',    
        });
      } else {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Origin': '*',
        });
      }

      // reference 6.1.4
      if (CorsOptions.allowExposedHeaders && CorsOptions.allowExposedHeaders.length > 0) {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Expose-Methods': CorsOptions.allowExposedHeaders.join(',\s'),
        });
      }

    } else { // is preflight request
      // reference 6.2.3
      const requestMethod = reqHeaders['access-control-request-method'];
      if(!requestMethod){
        finishedWithoutSetHeaders();
        return;
      }

      // reference 6.1.5
      if(!CorsOptions.allowMethods){
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Methods': requestMethod,
        })
      } else if(arrayIncludesAnother(CorsOptions.allowMethods, Array.from(requestMethod))){
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Methods': CorsOptions.allowMethods.join(', '),
        });
      } else {
        finishedWithoutSetHeaders();
        return;
      }

      // reference 6.1.4
      const requestHeaders = reqHeaders['access-control-request-headers'];
      if (!requestHeaders) {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Headers': [],      
        });
      }

      // reference 6.1.6
      if (requestHeaders) {
        if (!CorsOptions.allowHeaders) {
          Object.assign(CORSResponseHeaders, {
            'Access-Control-Allow-Headers': requestHeaders,
          });
        } else if(arrayIncludesAnother(CorsOptions.allowHeaders, requestHeaders.split(/\s*,\s*/))){
          Object.assign(CORSResponseHeaders, {
            'Access-Control-Allow-Headers': CorsOptions.allowHeaders.join(', '),
          });
        } else {
          finishedWithoutSetHeaders();
        }
      }

      // reference 6.1.7
      if (CorsOptions.isSupportCredentials) {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Origin': reqHeaders['origin'],
          'Access-Control-Allow-Credentials': 'true',
        });
      } else {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Allow-Origin': '*', // `*` or `reqHeaders['origin']`
        });
      }

      // reference 6.1.8
      if (!CorsOptions.maxAge) {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Max-Age' : 60 * 60 * 24 * 355, // optionally
        });
      } else {
        Object.assign(CORSResponseHeaders, {
          'Access-Control-Max-Age': CorsOptions.maxAge,
        });
      }
    }

    ctx.set(CORSResponseHeaders);
  } catch(e){
    console.log(e);
  }
}

function finishedWithoutSetHeaders(){
  consle.log('finished without set headers');
}

/**
 * ignore case-sensitive
 */
function arrayIncludesAnother(one, another){
  var lowercaseOne = one.map(item => item.toLowerCase());
  var lowercaseAnother = another.map(item => item.toLowerCase());

  for(let value of lowercaseAnother){
    if (!lowercaseOne.includes(value)) {
      return false;
    }
  }

  return true;
}


export {
  GetKoaCors,
}
export default GetKoaCors;