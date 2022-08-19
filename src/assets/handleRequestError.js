import { ElMessage } from 'element-plus'
import { userStore } from './../stores/user.js'
import router from './../router/index.js'
export function handleRequestError ( error ) {
  console.log('handleRequestError()', error)
  switch(error.response.status){
    case 400:
      ElMessage({
        message: '400 Bad Request',
        type: 'warning'
      })
      userStore().setAccountToGuest()
      router.push('Login')
    break;
    case 401:
      ElMessage({
        message: '401 Unauthorized',
        type: 'warning'
      })
      router.push('Login')
      userStore().setAccountToGuest()
    break
    case 403: 
    console.log('403 on hRE()', router.getRoutes() )
     ElMessage({
        message: '403 Forbidden',
        type: 'warning'
      })
      router.push('Home')
    break
    case 404:
      ElMessage({
        message: '404 Not Found',
        type: 'warning'
      })
    break
    case 408: 
      ElMessage({
        message: '408 Request Timeout',
        type: 'warning'
      })
    break
    case 500:
      ElMessage({
        message: 'There was an error on the server.',
        type: 'warning'
      })
    break
  }
}