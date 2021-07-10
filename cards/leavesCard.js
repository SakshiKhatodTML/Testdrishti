const {ICON_URL } = require('../envConfig');// eslint-disable-line
module.exports.ManageLeavesCard=function (emp_id){
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.2',
        'body': [
            {
                'type': 'Image',
                'url': 'https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg',
                'size': 'Large'
            },
            {
                'type': 'TextBlock',
                'text': 'Manage Leaves',
                'wrap': true,
                'separator': true
            },
            {
                'type': 'ColumnSet',
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'Apply Leave',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'data': 'Apply Leave',
                                            'emp_id': `${emp_id}`,
                                            'msteams': {
                                                'type': 'task/fetch',
                                                'displayText': 'Apply Leave',
                                                'text': 'Apply Leave',
                                                'value': 'Apply Leave'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'View Applied Leaves',
                                        'data':{
                                            'intent': 'ILeaveHistory',
                                            'data': 'View Leave',
                                            'emp_id': `${emp_id}`,
                                            'msteams': {
                                                'type': 'task/fetch',
                                                'displayText': 'View Applied Leaves',
                                                'text': 'View Applied Leaves',
                                                'value': 'View Applied Leaves'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'View Leaves Quota',
                                        'data':{
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'View Leaves Quota',
                                                'text': 'View Leaves Quota',
                                                'value': 'View Leaves Quota'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
module.exports.LeaveQuotaCard=function(data,emp_id){
    let facts=[]
    for(let k in data){
        facts.push({
            'title': data[k].leave_quota_text,
            'value': `${data[k].available_leaves} available of ${data[k].total_leaves}`
        })
    }
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.2',
        'body': [
            {
                'type': 'Image',
                'url': 'https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg',
                'size': 'Large'
            },
            {
                'type': 'TextBlock',
                'text': 'Leave Quota Overview',
                'wrap': true,
                'separator': true,
                'weight': 'Bolder'
            },
            {
                'type': 'FactSet',
                'facts': facts
            },
            {
                'type': 'ActionSet',
                'separator': true,
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Apply Leave',
                        'data':{
                            'intent': 'IApplyLeave',
                            'data': 'Apply Leave',
                            'emp_id': `${emp_id}`,
                            'msteams': {
                                'type': 'task/fetch',
                                'displayText': 'Apply Leave',
                                'text': 'Apply Leave',
                                'value': 'Apply Leave'
                            }
                        }
                    }
                ],
                'horizontalAlignment': 'Right'
            }
        ]
    }
}
module.exports.LeaveTypeCard=function(username){// eslint-disable-line
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.2',
        'body': [
            {
                'type': 'TextBlock',
                'text': 'Please select Leave Type',
                'wrap': true,
                'separator': true
            },
            {
                'type': 'ColumnSet',
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'CL',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveType':'Casual Leave'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Casual Leave',
                                                'text': 'Casual Leave',
                                                'value': 'Casual Leave'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'PL',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveType':'Privilege Leave'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Privilege Leave',
                                                'text': 'Privilege leave',
                                                'value': 'Privilege leave'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'SL',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveType':'Sick Leave'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Sick Leave',
                                                'text': 'Sick Leave',
                                                'value': 'Sick Leave'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'WFH',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveType':'Work From Home'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Work From Home',
                                                'text': 'Work From Home',
                                                'value': 'Work From Home'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
module.exports.LeaveOptionsCard=function(username){//eslint-disable-line
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.2',
        'body': [
            {
                'type': 'TextBlock',
                'text': 'Please select option',
                'wrap': true,
                'separator': true
            },
            {
                'type': 'ColumnSet',
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'First Half Day',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveRequestType':'First Half Day'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'First Half Day',
                                                'text': 'First Half Day',
                                                'value': 'First Half Day'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'Second Half Day',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveRequestType':'Second Half Day'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Second Half Day',
                                                'text': 'Second Half Day',
                                                'value': 'Second Half Day'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'ActionSet',
                                'actions': [
                                    {
                                        'type': 'Action.Submit',
                                        'title': 'Full Day',
                                        'data':{
                                            'intent': 'IApplyLeave',
                                            'entity': {'leaveRequestType':'Full Day'},
                                            'parentDialog': 'apply leave',
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Full Day',
                                                'text': 'Full Day',
                                                'value': 'Full Day'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
module.exports.SelectedDateRang=function(option, data){

    let date_ob = new Date()  
    let date = ''
    let day = ('0' + date_ob.getDate()).slice(-2) 
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2) 
    let year = date_ob.getFullYear() 
    date = year + '-' + month + '-' + day
    let facts=[]
    for(let k in data){
        facts.push({
            'title': data[k].leave_quota_text,
            'value': `${data[k].available_leaves} available of ${data[k].total_leaves}`
        })
    }
    if(option)
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
               
                'type': 'TextBlock',
                'wrap': true,
                'size': 'Medium',
                'text': 'Your available leaves'
            },
            {
                'type': 'FactSet',
                'facts': facts
            },
            {
               
                'type': 'TextBlock',
                'wrap': true,
                'size': 'Medium',
                'text': 'Select Date Duration'
            },
            {
                'id': 'FromDate',
                'type': 'Input.Date',
                'label': 'From Date',
                'isRequired': true,
                'value': `${date}`,
                'errorMessage': 'error', 
                'min':`${date}`

            },
            {
                 'id': 'ToDate',
                'type': 'Input.Date',
                'label': 'To Date',
                'isRequired': true,
                'value': `${date}`,
                'errorMessage': 'error', 
                'min':  `${date}`

            },
            {
                'type': 'ActionSet',
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Submit',
                        'data':{
                            'intent': 'IApplyLeave',
                            'entity': {'leaveRequestType':'Full Day'},
                            'parentDialog': 'apply leave',
                            'msteams': {
                                'type': 'messageBack',
                                'displayText': 'Submit',
                                'text': 'Submit',
                                'value': 'Submit Full Day Type'
                            }
                        }
                    }
                ]
            }
        ]
    }
    else
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
               
                'type': 'TextBlock',
                'wrap': true,
                'size': 'Medium',
                'text': 'Your available leaves'
            },
            {
                'type': 'FactSet',
                'facts': facts
            },
            {
               
                'type': 'TextBlock',
                'wrap': true,
                'size': 'Medium',
                'text': 'Select Date'
            },
            {
                'id': 'FromDate',
                'type': 'Input.Date',
                'label': 'Date',
                'isRequired': true,
                'value': `${date}`,
                'errorMessage': 'error', 
                'min':`${date}`
            },
            {
                'type': 'ActionSet',
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Submit',
                        'data':{
                            'intent': 'IApplyLeave',
                            'entity': {'leaveRequestType':'Half Day'},
                            'parentDialog': 'apply leave',
                            'msteams': {
                                'type': 'messageBack',
                                'displayText': 'Submit',
                                'text': 'Submit',
                                'value': 'Submit Half Day Type'
                            }
                        }
                    }
                ]
            }
        ]
    }

}
module.exports.SelectedDateRangUpdate=function(from,to,option,leaveType,leaveReqType){
    if(option)
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'TextBlock',
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Selected Date'
            },
            {
                'type': 'ColumnSet',
                'separator': true,
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': 'Leave Type'
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': 'From '
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': 'To',
                                'wrap': true
                            }
                        ]
                    }
                ]
            },
            {
                'type': 'ColumnSet',
                'separator': true,
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': leaveType||''
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': from||''
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': to||'',
                                'wrap': true
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
    else
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'TextBlock',
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Selected Date'
            },
            {
                'type': 'ColumnSet',
                'separator': true,
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': 'Leave Type'
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': 'Request Type'
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': 'Date',
                                'wrap': true
                            }
                        ]
                    }
                ]
            },
            {
                'type': 'ColumnSet',
                'separator': true,
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': leaveType||''
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'wrap': true,
                                'text': leaveReqType||''
                            }
                        ]
                    },
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': from||'',
                                'wrap': true
                            }
                        ]
                    }
                ]
            }
        ]
    }

}
module.exports.LeaveRequestConfirm=function(name,data){
   let card= {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'TextBlock',
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Leave Request'
            }
            
        ]
    }
    if(data['ToDate'] == ''){
        card['body'].push({
            'type': 'ColumnSet',
            'columns': [
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'text': name||' ',
                            'wrap': true,
                            'color': 'Accent',
                            'weight': 'Bolder'
                        },
                        {
                            'type': 'FactSet',
                            'facts': [
                                {
                                    'title': 'Leave Type',
                                    'value': `${data['leaveType']}`
                                },
                                {
                                    'title': 'Leave Date',
                                    'value': `${data['FromDate']}` 
                                },
                                {
                                    'title': 'Leave For ',
                                    'value': `${data['leaveRequestType']}`  
                                }
                            ]
                        },
                        {
                            'type': 'Container',
                            'items': [
                                {
                                    'type': 'ColumnSet',
                                    'columns': [
                                        {
                                            'type': 'Column',
                                            'width': 'stretch',
                                            'items': [
                                                {
                                                    'type': 'ActionSet',
                                                    'actions': [
                                                        {
                                                            'type': 'Action.Submit',
                                                            'title': 'Confirm',
                                                            'data':{
                                                                'intent': 'IApplyLeave',
                                                                'parentDialog': 'apply leave',
                                                                'msteams': {
                                                                    'type': 'messageBack',
                                                                    'displayText': 'Confirm',
                                                                    'text': 'Confirm',
                                                                    'value': 'Confirm'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'Column',
                                            'width': 'stretch',
                                            'items': [
                                                {
                                                    'type': 'ActionSet',
                                                    'actions': [
                                                        {
                                                            'type': 'Action.Submit',
                                                            'title': 'Re-Apply Leave',
                                                            'data':{
                                                                'intent': 'IApplyLeave',
                                                                'parentDialog': 'apply leave',
                                                                'msteams': {
                                                                    'type': 'messageBack',
                                                                    'displayText': 'Re-Apply Leave',
                                                                    'text': 'Re-Apply Leave',
                                                                    'value': 'Re-Apply Leave'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            'separator': true
        })
    } 
    else{
        card['body'].push({
            'type': 'ColumnSet',
            'columns': [
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'text':  name||' ',
                            'wrap': true,
                            'color': 'Accent',
                            'weight': 'Bolder'
                        },
                        {
                            'type': 'FactSet',
                            'facts': [
                                {
                                    'title': 'Leave Type',
                                    'value': `${data['leaveType']}`
                                },
                                {
                                    'title': 'From',
                                    'value': `${data['FromDate']}`
                                },
                                {
                                    'title': 'To',
                                    'value': `${data['ToDate']}`
                                }
                            ]
                        },
                        {
                            'type': 'Container',
                            'items': [
                                {
                                    'type': 'ColumnSet',
                                    'columns': [
                                        {
                                            'type': 'Column',
                                            'width': 'stretch',
                                            'items': [
                                                {
                                                    'type': 'ActionSet',
                                                    'actions': [
                                                        {
                                                            'type': 'Action.Submit',
                                                            'title': 'Confirm',
                                                            'data':{
                                                                'intent': 'IApplyLeave',
                                                                'parentDialog': 'apply leave',
                                                                'msteams': {
                                                                    'type': 'messageBack',
                                                                    'displayText': 'Confirm',
                                                                    'text': 'Confirm',
                                                                    'value': 'Confirm'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            'type': 'Column',
                                            'width': 'stretch',
                                            'items': [
                                                {
                                                    'type': 'ActionSet',
                                                    'actions': [
                                                        {
                                                            'type': 'Action.Submit',
                                                            'title': 'Re-Apply Leave',
                                                            'data':{
                                                                'intent': 'IApplyLeave',
                                                                'parentDialog': 'apply leave',
                                                                'msteams': {
                                                                    'type': 'messageBack',
                                                                    'displayText': 'Re-Apply Leave',
                                                                    'text': 'Re-Apply Leave',
                                                                    'value': 'Re-Apply Leave'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            'separator': true
        })
    }
    return card
}
module.exports.LeaveRequestConfirmUpdate=function(name,data,message){
     
    let card= {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'TextBlock',
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Leave Request'
            }
            
        ]
    }
    if(data['ToDate'] == undefined){
        card['body'].push({
            'type': 'ColumnSet',
            'columns': [
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'text': name||' ',
                            'wrap': true,
                            'color': 'Accent',
                            'weight': 'Bolder'
                        },
                        {
                            'type': 'FactSet',
                            'facts': [
                                {
                                    'title': 'Leave Type',
                                    'value': `${data['leaveType']}`
                                },
                                {
                                    'title': 'Leave Date',
                                    'value': `${data['FromDate']}`
                                },
                                {
                                    'title': 'Leave For',
                                    'value': `${data['leaveRequestType']}`
                                }
                            ]
                        },
                        {
                            'type': 'Container',
                            'items': [
                                {
                                    'type': 'TextBlock',
                                    'text': message||'',
                                    'wrap': true,
                                    'color': 'Accent',
                                }
                            ]
                        }
                    ]
                }
            ],
            'separator': true
        })
    } 
    else{
        card['body'].push({
            'type': 'ColumnSet',
            'columns': [
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'text': name||' ',
                            'wrap': true,
                            'color': 'Accent',
                            'weight': 'Bolder'
                        },
                        {
                            'type': 'FactSet',
                            'facts': [
                                {
                                    'title': 'Leave Type',
                                    'value': `${data['leaveType']}`
                                },
                                {
                                    'title': 'From',
                                    'value': `${data['FromDate']}`
                                },
                                {
                                    'title': 'To',
                                    'value': `${data['ToDate']}`
                                }
                            ]
                        },
                        {
                            'type': 'Container',
                            'items': [
                                {
                                    'type': 'TextBlock',
                                    'text': message||'',
                                    'wrap': true,
                                    'color': 'Accent',
                                }
                            ]
                        }
                    ]
                }
            ],
            'separator': true
        })
    }
    
    
    return card
}

module.exports.AvailableLeavesCard=function(data){
    let col=[]
    for(let i in data){
         col.push({
            'type': 'ColumnSet',
            'separator': true,
            'columns': [
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'wrap': true,
                            'text': data[i].leave_quota_text
                        }
                    ]
                },
                {
                    'type': 'Column',
                    'width': 'stretch',
                    'items': [
                        {
                            'type': 'TextBlock',
                            'text': `${data[i].available_leaves} available of ${data[i].total_leaves}`,
                            'wrap': true
                        }
                    ]
                }
            ]
        })
    }
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body': [
            {
                'type': 'TextBlock',
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Your Available Leaves'
            },
            ...col
        ]
    }
}
