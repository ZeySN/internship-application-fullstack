/*
zeynep inkaya
zeynsemn@gmail.com
https://cloudflare-2020-int.zeynsemn.workers.dev/
*/

addEventListener('fetch', event => {
  
  event.respondWith(handleRequest(event.request))
  
})
// /**
//  * Respond with hello worker text
//  * @param {Request} request
//  */
async function handleRequest(request) {
    //response1 is json of 'https://cfw-takehome.developers.workers.dev/api/variants' fetch
    let response1 = await getRequest('https://cfw-takehome.developers.workers.dev/api/variants')
    if(response1 === "error"){
        return new Response("error", {
            headers: { 'content-type': 'text/plain' },
        })
    }
    let obj = JSON.parse(JSON.stringify(response1))
    let random_number = generateRandomNumber()
    //generateRandomNumber returns either 0 or 1, then get response2 from variants
    let response2 = getRequest(JSON.stringify(obj.variants[random_number]))
    let redirect_url = new URL(obj.variants[random_number])
    console.log(redirect_url)
    //redirect to the variants1 or variants2
    return Response.redirect(redirect_url)
    
    
    
}
//return the json of fetch request
async function getRequest(url){
    
    let response = await fetch(url)
    if( !(response.status >= 200) && !(response.status < 300)){
        return "error"
    }
    let data = await response.json()
    .catch(err=> err)
    return data
}

function generateRandomNumber(){
    return (Math.floor(Math.random() * 11) % 2)
}