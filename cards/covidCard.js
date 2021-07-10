module.exports.CovidFirstCard=function (){
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
                'text': 'No COVID Vaccination data available for you.',
                'weight': 'Bolder',
                'separator': true
            },
            {
                'type': 'TextBlock',
                'text': 'Tata Motors urge you to get vaccinated as soon as possible',
                'wrap': true,
                'weight': 'Bolder',
                'color': 'Attention',
                'size': 'Large'
            },
            {
                'type': 'ActionSet',
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Add Dose-1 Details',
                        'data':{
                            'msteams': {
                                'type': 'messageBack',
                                'displayText': 'Add Dose-1 Details',
                                'text': 'Add Dose-1 Details',
                                'value': 'Add Dose-1 Details'
                            }
                        }
                    }
                ],
                'horizontalAlignment': 'Right',
                'separator': true
            }
        ]
    }
}
module.exports.CovidDose1Card=function(){
    return {
        
            'type': 'AdaptiveCard',
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'version': '1.3',
            'body': [
                {
                    'type': 'Image',
                    'url': 'https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg',
                    'size': 'Large'
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
                                    'text': 'Vaccination Date',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'Input.Date',
                                    'id': 'date'
                                }
                            ]
                        }
                    ]
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
                                    'text': 'Dose',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'TextBlock',
                                    'text': '1',
                                    'wrap': true
                                }
                            ]
                        }
                    ]
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
                                    'text': 'Brand',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'Input.ChoiceSet',
                                    'choices': [
                                        {
                                            'title': 'covaxin',
                                            'value': 'covaxin'
                                        },
                                        {
                                            'title': 'covishield',
                                            'value': 'covishield'
                                        },
                                        {
                                            'title': 'sputnik V',
                                            'value': 'sputnik V'
                                        }
                                    ],
                                    'placeholder': 'Placeholder text',
                                    'id': 'type'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type': 'ActionSet',
                    'actions': [
                        {
                            'type': 'Action.Submit',
                            'title': ' Submit Details',
                            'data': {
                                                    'msteams': {
                                                        'type': 'messageBack',
                                                        'displayText': 'Submit Details',
                                                        'text': 'Submit Details',
                                                        'value': 'Submit Details'
                                                    }
                                                }
                        }
                    ]
                }
            ]
        
        // "type": "AdaptiveCard",
        // "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        // "version": "1.2",
        // "body": [
        //     {
        //         "type": "Image",
        //         "url": "https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg"
                 
        //     },
        //     {
        //         "type": "TextBlock",
        //         "text": "Please Enter COVID Dose-1 Details",
        //         "wrap": true,
        //         "separator": true,
        //         "weight": "Bolder"
        //     },
        //     {
        //         "type": "Container",
        //         "items": [
        //             {
        //                 "type": "ColumnSet",
        //                 "columns": [
        //                     {
        //                         "type": "Column",
        //                         "width": "stretch",
        //                         "items": [
        //                             {
        //                                 "type": "TextBlock",
        //                                 "wrap": true,
        //                                 "text": "Vaccination Date"
        //                             }
        //                         ],
        //                         "horizontalAlignment": "Center",
        //                         "backgroundImage": {
        //                             "horizontalAlignment": "Center",
        //                             "verticalAlignment": "Center"
        //                         },
        //                         "verticalContentAlignment": "Center"
        //                     },
        //                     {
        //                         "type": "Column",
        //                         "width": "stretch",
        //                         "items": [
        //                             {
        //                                 "type": "Input.Date",
        //                                 "id": "vaccination_date"
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "type": "Container",
        //         "items": [
        //             {
        //                 "type": "ColumnSet",
        //                 "columns": [
        //                     {
        //                         "type": "Column",
        //                         "width": "stretch",
        //                         "items": [
        //                             {
        //                                 "type": "TextBlock",
        //                                 "text": "Dosage",
        //                                 "wrap": true
        //                             }
        //                         ],
        //                         "backgroundImage": {
        //                             "horizontalAlignment": "Center"
        //                         },
        //                         "verticalContentAlignment": "Center"
        //                     },
        //                     {
        //                         "type": "Column",
        //                         "width": "stretch",
        //                         "items": [
        //                             {
        //                                 "type": "TextBlock",
        //                                 "text": "01",
        //                                 "wrap": true
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ],
        //         "verticalContentAlignment": "Center"
        //     },
        //     {
        //         "type": "ColumnSet",
        //         "columns": [
        //             {
        //                 "type": "Column",
        //                 "width": "stretch",
        //                 "items": [
        //                     {
        //                         "type": "TextBlock",
        //                         "text": "Brand",
        //                         "wrap": true
        //                     }
        //                 ],
        //                 "verticalContentAlignment": "Center"
        //             },
        //             {
        //                 "type": "Column",
        //                 "width": "stretch",
        //                 "items": [
        //                     {
        //                         "type": "Input.ChoiceSet",
        //                         "choices": [
        //                             {
        //                                 "title": "Covishield",
        //                                 "value": "01"
        //                             },
        //                             {
        //                                 "title": "Covaxin",
        //                                 "value": "02"
        //                             },
        //                             {
        //                                 "title": "SPUTNIK",
        //                                 "value": "03"
        //                             }
        //                         ],
        //                         "placeholder": "Select",
        //                         "id": "vaccine_type"
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "type": "ActionSet",
        //         "actions": [
        //             {
        //                 "type": "Action.Submit",
        //                 "title": "Submit Details",
        //                 "data": {
        //                     "msteams": {
        //                         "type": "messageBack",
        //                         "displayText": "Submit Details",
        //                         "text": "Submit Details",
        //                         "value": "Submit Details"
        //                     }
        //                 }
        //             }
        //         ],
        //         "separator": true,
        //         "horizontalAlignment": "Right"
        //     }
        // ]
    }
}
module.exports.Dose1DetailConfirmCard=function(){
    return {
        'type': 'AdaptiveCard',
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.3',
        'body':[
            {
                    'type': 'TextBlock',
                    'wrap': true,
                    'weight': 'Bolder',
                    'size': 'Large',
                    'text': 'Covid Data'
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
                                'text':  ' ',
                                'wrap': true,
                                'color': 'Accent',
                                'weight': 'Bolder'
                            },
                            {
                                'type': 'FactSet',
                                'facts': [
                                    {
                                        'title': 'Covid Dose:',
                                        'value':  '1'
                                    },
                                    {
                                        'title': 'Vaccine Brand:',
                                        'value': 'Sputink-V'
                                    },
                                    {
                                        'title': 'Date: ',
                                        'value': '26-1-2021' 
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
                                                                'title': 'Edit',
                                                                'data':{
                                                                    'msteams': {
                                                                        'type': 'messageBack',
                                                                        'displayText': 'Edit',
                                                                        'text': 'Edit',
                                                                        'value': 'Edit'
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
            }
        ]
    }
}

module.exports.EditDose1DetailsCard=function(){
    return {
        
            'type': 'AdaptiveCard',
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'version': '1.3',
            'body': [
                {
                    'type': 'Image',
                    'url': 'https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg',
                    'size': 'Large'
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
                                    'text': 'Vaccination Date',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'Input.Date',
                                    'id': 'date'
                                }
                            ]
                        }
                    ]
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
                                    'text': 'Brand',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'TextBlock',
                                    'text': '1',
                                    'wrap': true
                                }
                            ]
                        }
                    ]
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
                                    'text': 'Brand',
                                    'wrap': true
                                }
                            ]
                        },
                        {
                            'type': 'Column',
                            'width': 'stretch',
                            'items': [
                                {
                                    'type': 'Input.ChoiceSet',
                                    'choices': [
                                        {
                                            'title': 'covaxin',
                                            'value': 'covaxin'
                                        },
                                        {
                                            'title': 'covishield',
                                            'value': 'covishield'
                                        },
                                        {
                                            'title': 'sputnik V',
                                            'value': 'sputnik V'
                                        }
                                    ],
                                    'placeholder': 'Placeholder text',
                                    'id': 'type'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type': 'ActionSet',
                    'actions': [
                        {
                            'type': 'Action.Submit',
                            'title': ' Submit Details',
                            'data': {
                                                    'msteams': {
                                                        'type': 'messageBack',
                                                        'displayText': 'Submit Details',
                                                        'text': 'Submit Details',
                                                        'value': 'Submit Details'
                                                    }
                                                }
                        }
                    ]
                }
            ]
        
    }
}
module.exports.CovidDose1SuccessCard=function(){
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
                'text': 'Your COVID DOSE-1 Details were captured successfully.\n  ',
                'wrap': true,
                'separator': true,
                'color': 'Good',
                'weight': 'Bolder'
            },
            {
                'type': 'TextBlock',
                'text': 'To manage your COVID Data, please select below option',
                'wrap': true
            },
            {
                'type': 'ActionSet',
                'separator': true,
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Manage COVID Data',
                        'data':{
                            'msteams': {
                                'type': 'messageBack',
                                'displayText': 'Manage COVID Data',
                                'text': 'Manage COVID Data',
                                'value': 'Manage COVID Data'
                            }
                        }
                    }
                ],
                'horizontalAlignment': 'Right'
            }
        ]
    }
}
module.exports.CovidDose2Card=function(){
    return {
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'type': 'AdaptiveCard',
        'version': '1.2',
        'body': [
            {
                'type': 'Image',
                'url': 'https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg',
                'size': 'Large'
            },
            {
                'type': 'TextBlock',
                'text': 'Manage your COVID Data',
                'size': 'Medium',
                'weight': 'Bolder',
                'wrap': true,
                'separator': true
            }
        ],
        'actions': [
            {
                'type': 'Action.ShowCard',
                'title': 'Dose 1 Details',
                'card': {
                    'type': 'AdaptiveCard',
                    'actions': [
                        {
                            'type': 'Action.Submit',
                            'title': 'Edit',
                            'data':{
                                'msteams': {
                                    'type': 'messageBack',
                                    'displayText': 'Edit',
                                    'text': 'Edit',
                                    'value': 'Edit'
                                }
                            }
                        }
                    ],
                    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                    'body': [
                        {
                            'type': 'FactSet',
                            'facts': [
                                {
                                    'title': 'Vaccination Date',
                                    'value': '23/06/2021'
                                },
                                {
                                    'title': 'Brand',
                                    'value': 'COVISHIELD'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                'type': 'Action.ShowCard',
                'title': 'Add Dose 2 Details',
                'card': {
                    'type': 'AdaptiveCard',
                    'actions': [
                        {
                            'type': 'Action.Submit',
                            'title': 'Submit Details',
                            'data':{
                                'msteams': {
                                    'type': 'messageBack',
                                    'displayText': 'submit details dose-2',
                                    'text': 'submit details dose-2',
                                    'value': 'submit details dose-2'
                                }
                            }
                        }
                    ],
                    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                    'body': [
                        {
                            'type': 'ColumnSet',
                            'columns': [
                                {
                                    'type': 'Column',
                                    'width': 'stretch',
                                    'items': [
                                        {
                                            'type': 'TextBlock',
                                            'text': 'Vaccination Date',
                                            'wrap': true
                                        }
                                    ],
                                    'verticalContentAlignment': 'Center'
                                },
                                {
                                    'type': 'Column',
                                    'width': 'stretch',
                                    'items': [
                                        {
                                            'type': 'Input.Date'
                                        }
                                    ]
                                }
                            ]
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
                                            'text': 'Dosage',
                                            'wrap': true
                                        }
                                    ],
                                    'verticalContentAlignment': 'Center'
                                },
                                {
                                    'type': 'Column',
                                    'width': 'stretch',
                                    'items': [
                                        {
                                            'type': 'TextBlock',
                                            'text': '02',
                                            'wrap': true
                                        }
                                    ]
                                }
                            ]
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
                                            'text': 'Brand',
                                            'wrap': true
                                        }
                                    ],
                                    'verticalContentAlignment': 'Center'
                                },
                                {
                                    'type': 'Column',
                                    'width': 'stretch',
                                    'items': [
                                        {
                                            'type': 'TextBlock',
                                            'text': 'COVISHIELD',
                                            'wrap': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
}