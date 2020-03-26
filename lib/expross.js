
const http=require('http')

function createApplication(){
    return {
        get:function(){
            console.log('expross().get function')
        },
        listen:function(port,cb){
           let server= http.createServer((req,res)=>{
               console.log('http.createServer')
           })

           return server.listen(port,cb)
        }
    }
}

module.exports=createApplication