// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { UISettings } = require('./uisettings')
const { TaskModuleIds } = require('./taskmoduleids')
const TaskModuleUIConstants = {
    APPLY_LEAVE: new UISettings(474, 560, 'Apply Leave', TaskModuleIds.APPLY_LEAVE, 'Apply Leave'),
    VIEW_LEAVE: new UISettings(600, 560, 'View Leave', TaskModuleIds.VIEW_LEAVE, 'View Leave'),
    APPROVE_LEAVE:new UISettings(600, 560, 'Approve Leave', TaskModuleIds.APPROVE_LEAVE, 'Approve Leave')
}

module.exports.TaskModuleUIConstants = TaskModuleUIConstants

