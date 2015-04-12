aasAdmin.controller('gameController',
    [
        "$scope",
        "$cookies",
        "ioSocket",
        "$sce",
        "$globals",
        "$game",
        "$measure",
        function($scope, $cookies, ioSocket, $sce, $globals, $game, $measure) {
            $scope.gameRunning = $globals.get('gameRunning');

            $scope.$on("$destroy", function(){
                console.log('Exit game controller');
            });

            $scope.$on('$viewContentLoaded', function() {

                var canvasOffset = $measure.getOffset(document.getElementById('mpGameCanvas'));

                // Position blocker ( 8px = borders and stuff)
                document.getElementById('blocker').style.top = (0 - (document.getElementById('mpGameCanvas').offsetHeight + 8)) + 'px';

                console.log(document.getElementById('navigation').offsetWidth);

                //if($scope.gameRunning == false) {
                    worldInit();
                    game(world, tick);
                    $scope.gameRunning = true;
                    $globals.set('gameRunning', $scope.gameRunning);
                //}
            });
            return 0;
        }
    ]
);