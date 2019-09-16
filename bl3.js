/*

After login, navigate to
https://borderlands.com/en-US/vip-codes/
*/

var KEY = [
    '9XCBT-WBXFR-5TRWJ-JJJ33-TX53Z',
    'ZFKJ3-TT6FF-KTFKT-T3JJT-JWX36',
    'HXKBT-XJ6FR-WBRKJ-J3TTB-RSBHR',
    'ZRWBJ-ST6XR-CBFKT-JT3J3-FRXJ5',
    'Z65B3-JCXX6-5JXW3-3B33J-9SWT6',
    'ZFKJ3-TT3BB-JTBJT-T3JJT-JWX9H',
    '5SWBT-X93RW-HHRXB-JBJBB-T63JC'
]


async function redeem(key){
    let cookie = getCookie('session').replace('"','').replace('"','')
    let response = await fetch('https://api.2k.com/borderlands/code/'+key+'/info', {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json',
            'X-SESSION' : cookie
        }
    })

    let result = await response.json();
    if(result.entitlement_offer_codes[0].is_active)
    {
        let response = await fetch('https://api.2k.com/borderlands/code/'+key+'/redeem/epic', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'X-SESSION' : cookie
            }
        })
        let result1 = await response.json();

        if(result1.job_id){
            let jobID = result1.job_id;

            let response = await fetch('https://api.2k.com/borderlands/code/'+key+'/job/'+jobID, 
            {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'X-SESSION' : cookie
                }
            })

            let result2 = await response.json();

            if(result2.success){
                console.log('KEY:',result2)
            }else{
                console.log('KEY',result2.eoc,result2.errors[0])
            }
           

        }
        

    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}



async function main() 
{
   for(let i = 0;i<KEY.length;i++){
       await redeem(KEY[i])
   }
    
}

main()
