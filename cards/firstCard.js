
const {ICON_URL } = require('../envConfig')
module.exports.firstCard=function(link, id){

return {
    'type': 'AdaptiveCard',
    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
    'version': '1.2',
    'body': [
        {
            'type': 'TextBlock',
            'text': 'Hello, I am Drishti on Teams!',
            'wrap': true,
            'size': 'Large',
            'weight': 'Bolder'
        },
        {
            'type': 'Image',
            'url': ICON_URL.TATA_LOGO,
            'separator': true,
            'horizontalAlignment': 'Center',
            'size': 'Large'
        },
        {
            'type': 'TextBlock',
            'text': 'Here are some things I can do :',
            'wrap': true,
            'separator': true,
            'size': 'Large'
        },
        {
            'type': 'FactSet',
            'facts': [
                {
                    'title': '-',
                    'value': 'Leave Management on Teams'
                },
                {
                    'title': '-',
                    'value': 'COVID Vaccination Data Updation'
                }
            ]
        },
        {
            'type': 'TextBlock',
            'text': 'Ready to get started? Sign In Now!',
            'wrap': true,
            'weight': 'Bolder'
        },
        {
            'type': 'ActionSet',
            'actions': [
                {
                    'type': 'Action.Submit',
                    'title': 'Sign In',
                    'data': {
                        'msteams': {
                            'type': 'signin',
                            'value': link+'&&&'+id
                        }
                    }
                }
            ],
            'horizontalAlignment': 'Right',
            'height': 'stretch'
        }
    ]
}  
}
module.exports.WelcomeCard=function(username){// eslint-disable-line
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
                'text': 'Please select any option from below',
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
                                        'title': 'Manage Leaves',
                                        'data':{
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'Manage Leaves',
                                                'text': 'Manage Leaves',
                                                'value': 'Manage Leaves'
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
                                        'title': 'COVID Data',
                                        'data':{
                                            'msteams': {
                                                'type': 'messageBack',
                                                'displayText': 'COVID Data',
                                                'text': 'COVID Data',
                                                'value': 'COVID Data'
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