import axios from 'axios'
const headers = {}
headers['Content-Type'] = 'application/json;charset=UTF-8'
headers['Access-Control-Allow-Origin'] = '*'


export async function RecipeFetch (url){
 try{
    const response = await axios.get(url, { headers: headers })
    return response
 }
 catch (err) {
     console.log(err);
    return err
  }

}
