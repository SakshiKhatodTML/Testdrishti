var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
oracledb.autoCommit=true;

/**
 * Singleton connection
 */
 class OracleDbHandler {
    /* eslint-disable-next-line */
    static ODBConnection
    static async Connection() {
        if (!OracleDbHandler.ODBConnections) {
            console.log("Obj create")
            return new Promise((resolve, reject) => {
                oracledb.getConnection(
                    {
                        user : dbConfig.user,
                        password : dbConfig.password,
                        connectString : dbConfig.connectString
                    },
                    (err, connection) => {
                        if (err) {
                            console.log("Oracle Database connection issue");
                            reject(err);
                        }
                        OracleDbHandler.ODBConnection = connection;
                        resolve(connection)
                    }
                )
            })
        }
        else {
            console.log("Obj send previous")
            return OracleDbHandler.ODBConnections;
        }
    }
}
module.exports.OracleDbHandler=OracleDbHandler;
/**
 * Sample Connection Check
 */
module.exports.getEmployeeData = async () => {
    //const coonection=   await OracleDbHandler.Connection();
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute('SELECT * FROM TRIAL', [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
    
}

module.exports.getAllDoseOneData = async () => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute('SELECT * FROM TRIAL WHERE VACCINETYPE = "1" ', [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}

module.exports.getAllDoseTwoData = async () => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute('SELECT * FROM TRIAL WHERE VACCINETYPE = "2"', [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}
module.exports.getDoseOneDataById = async (employeeid) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`SELECT * FROM TRIAL WHERE VACCINETYPE = "1" AND EMPLOYEEID = "${employeeid}"`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}
module.exports.getDoseTwoDataById = async (employeeid) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`SELECT * FROM TRIAL WHERE VACCINETYPE = "2" AND EMPLOYEEID = "${employeeid}"`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}
module.exports.getVaccinationDataById = async (employeeid) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`SELECT * FROM TRIAL WHERE EMPLOYEEID ="${employeeid}"`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}

module.exports.postDoseOneData = async (doseOneDate,vaccineBrand) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`INSERT INTO TRIAL(EMPLOYEEID,EMPLOYEENAME,DATEOFVACCINATION,vaccinetype,BRANDORMAKE,CREATEDBY,CREATEDDATE,MODIFIEDBY,MODIFIEDDATE,EMPLOYEE_TYPE)
        VALUES('50329','Aditya',to_date('${doseOneDate}','yyyy-mm-dd'),'1','${vaccineBrand}','Aditya',to_date('2021-06-22','yyyy-mm-dd'),'Raghav',to_date('2021-06-27','yyyy-mm-dd'),'FTE')`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}

module.exports.postDoseTwoData = async (doseTwoDate) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute('INSERT INTO TRIAL()', [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}

module.exports.updateDoseOneData = async (updatedDoseOneDate,updatedDoseOneBrand) => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`UPDATE TRIAL SET DATEOFVACCINATION='${updatedDoseOneDate}', BRANDORMAKE='${updatedDoseOneBrand}' WHERE EMPLOYEEID='503284'`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}

module.exports.deleteVaccinationData = async () => {
    return new Promise((resolve, reject)=>{
        OracleDbHandler.ODBConnection.execute(`DELETE FROM TRIAL WHERE EMPLOYEEID='503284'`, [], function (err, result) {
            if (err) { 
                reject(err) 
            }
            resolve(result);
        })
    })
}
