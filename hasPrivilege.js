exports.hasPrivilege = function(message, permission) {
    if(message.member.hasPermission(`${permission}`)) {
        return true;
    } else {
        return ':negative_squared_cross_mark: You do not have the permissions required by this command.';
    }
};
