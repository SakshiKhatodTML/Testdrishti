module.exports.leaveApprovedCard=function(){
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
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Leave Request'
            },
            {
                'type': 'ColumnSet',
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': 'David Thomas',
                                'wrap': true,
                                'color': 'Accent',
                                'weight': 'Bolder'
                            },
                            {
                                'type': 'FactSet',
                                'facts': [
                                    {
                                        'title': 'Leave Type',
                                        'value': 'Privilege'
                                    },
                                    {
                                        'title': 'From',
                                        'value': '24 Jan 2021'
                                    },
                                    {
                                        'title': 'To',
                                        'value': '27 Jan 2021'
                                    }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Approved',
                                'wrap': true,
                                'color': 'Good',
                                'weight': 'Bolder'
                            }
                        ]
                    }
                ],
                'separator': true
            },
            {
                'type': 'ActionSet',
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Chat with Manager'
                    }
                ],
                'horizontalAlignment': 'Right',
                'separator': true
            }
        ]
    }
}
module.exports.leaveRejectedCard=function(){
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
                'wrap': true,
                'weight': 'Bolder',
                'size': 'Large',
                'text': 'Leave Request'
            },
            {
                'type': 'ColumnSet',
                'columns': [
                    {
                        'type': 'Column',
                        'width': 'stretch',
                        'items': [
                            {
                                'type': 'TextBlock',
                                'text': 'David Thomas',
                                'wrap': true,
                                'color': 'Accent',
                                'weight': 'Bolder'
                            },
                            {
                                'type': 'FactSet',
                                'facts': [
                                    {
                                        'title': 'Leave Type',
                                        'value': 'Privilege'
                                    },
                                    {
                                        'title': 'From',
                                        'value': '24 Jan 2021'
                                    },
                                    {
                                        'title': 'To',
                                        'value': '27 Jan 2021'
                                    }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Reject',
                                'wrap': true,
                                'color': 'Good',
                                'weight': 'Bolder'
                            }
                        ]
                    }
                ],
                'separator': true
            },
            {
                'type': 'ActionSet',
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Chat with Manager'
                    }
                ],
                'horizontalAlignment': 'Right',
                'separator': true
            }
        ]
    }
}