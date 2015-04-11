// let's define the navigation controller that we call up in the site
aasAdmin.controller('navigationController', function($scope, $globals) {
    $scope.collapsed = $globals.get('collapsed');

    $scope.openClose = function() {
        $scope.collapsed = !$scope.collapsed;
        $globals.set('collapsed', $scope.collapsed);
    }

    $scope.buttons = [
        {
            name: 'STATUS',
            sref: 'status',
            fa : 'fa fa-heartbeat fa-fw'
        },
        {
            name: 'CONFIG',
            sref: 'config',
            fa : 'fa fa-cogs fa-fw'
        },
        {
            name: 'MAINTENANCE',
            sref: 'maintenance',
            fa : 'fa fa-wrench fa-fw'
        },
        {
            name: 'SOCKET.IO',
            sref: 'socketio',
            fa : 'fa fa-plug fa-fw'
        },
        {
            name: 'CHAT',
            sref: 'chat',
            fa : 'fa fa-comment-o fa-fw'
        },
        {
            name: 'GAME',
            sref: 'game',
            fa : 'fa fa-gamepad fa-fw'
        }
    ];
});