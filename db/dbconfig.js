module.exports = {
    user : process.env.NODE_ORACLEDB_USER || "SYSTEM",
    
    password : process.env.NODE_ORACLEDB_PASSWORD || "DrishtiPass",
    
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/XEPDB1",
    
    externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
    };