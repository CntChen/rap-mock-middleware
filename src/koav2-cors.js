// KOA v2 CORS middleware
// reference: https://www.w3.org/TR/cors/#resource-processing-model

async function KoaV2CORS(ctx, next){
    try{
        if(next){
            await next();
        }

        // All headers is lowercase
        const reqHeaders = ctx.headers;
        let CORSResponseHeaders = {};        

        if(!reqHeaders['origin']){
            corsFail();
            return;
        }

        // is simple request
        if(!reqHeaders['access-control-request-headers'] && !reqHeaders['access-control-request-methods']){
            Object.assign(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': reqHeaders['origin'],
                'Access-Control-Allow-Credentials': 'true',
            });
        } else { // is preflight request
            Object.assign(CORSResponseHeaders, {
                'Access-Control-Allow-Origin': reqHeaders['origin'],
                'Access-Control-Allow-Credentials': 'true',
            });

            const requestMethod = reqHeaders['access-control-request-method'];
            if(!requestMethod){
                corsFail();
                return;
            }

            Object.assign(CORSResponseHeaders, {
                'Access-Control-Allow-Method': requestMethod,
            });

            const requestHeaders = reqHeaders['access-control-request-headers'];
            Object.assign(CORSResponseHeaders, {
                'Access-Control-Allow-Headers': requestHeaders || [],            
            });

            Object.assign(CORSResponseHeaders, {
                'Access-Control-Max-Age' : 60 * 60 * 24 * 356,
            });
        }

        ctx.set(CORSResponseHeaders);
    } catch(e){
        console.log(e);
        corsFail();
    }
}

function corsFail(){
    console.log('CORS fail');
}


export {
  KoaV2CORS,
}
export default KoaV2CORS;