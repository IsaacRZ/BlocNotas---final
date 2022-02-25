const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user: 'root',
    password: "12345",
    database: 'backendfundament'
})

function query(sql,data){
    return new Promise((resolve,reject)=>{
        connection.query(sql,data,function(error,result){
            if(error){
                reject(error.sqlMessage)
            }else{
                resolve(result)
            }
        })
    })
}  
async function read(data){
    try {
        await query('SELECT * FROM (?)',[data])
        return data    
    } catch (error) {
        return error
    }
}

async function insert(tableName,data){
    try{
        await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[
            Object.keys(data),
            Object.values(data)
        ])
        //console.log(Object.keys(data))
        return {data,success:true}
    }catch(error){
        return {error,success:false}
    }
}

async function del(tableName,data){
    try{
        await query(`DELETE FROM ${tableName} WHERE id= ?`,[data])
        return data
    }catch(error){
        return error
    }
}

async function update(data,id){
    try {
        console.log(data.name)
        await query(
        `UPDATE users SET name= '${data.name}', birthday = '${data.Date}', text='${data.texto}' WHERE id = ${id}`,
        [Object.values(data)]
        );
        return data
    } catch (error) {
        return error
    }
}



module.exports={query,del,insert,update}