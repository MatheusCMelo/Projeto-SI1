app.controller("registerComplaintCtrl", function ($scope, toastr, $location, RESTService) {

    $scope.registerFoodComplaint = function (complaint) {
        RESTService.registerFoodComplaint(complaint)
            .then(function success(response) {
                toastr.success("Queixa adicionada com sucesso!");
                $location.path('/createdcomplaint/' + response.data.id);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar queixa.");
            });
    }

    $scope.registerAnimalComplaint = function (complaint) {
        RESTService.registerAnimalComplaint(complaint)
            .then(function success(response) {
                toastr.success("Queixa adicionada com sucesso!");
                $location.path('/createdcomplaint/' + response.data.id);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar queixa.");
            });
    }

    $scope.registerGeneralComplaint = function (complaint) {
        RESTService.registerGeneralComplaint(complaint)
            .then(function success(response) {
                toastr.success("Queixa adicionada com sucesso!");
                $location.path('/createdcomplaint/' + response.data.id);
            }, function error(error) {
                console.log(error);
                console.log("Problemas ao tentar adicionar queixa.");
            });
    }
});

app.controller("searchAverangeCtrl", function ($scope, RESTService) {

    $scope.average = null;

    $scope.searchAveragePerPatient = function (id) {
        RESTService.searchAveragePerPatient(id)
        .then(function successCallback(response) {
            $scope.average = response.data.obj;
        }, function errorCallback(error) {
            console.log("Unidade Não Encontrada");
        });
    }
});

app.controller("searchComplaintCtrl", function ($scope, RESTService) {
    $scope.complaint;

    $scope.searchComplaint = function (id) {
        RESTService.searchComplaint(id)
        .then(function successCallback(response) {
            $scope.complaint = response.data;
            console.log(response.data);
        }, function errorCallback(error) {
            $scope.complaint = null;
            console.log(error);
        });
    }

    $scope.setEmAndamento = function(queixa) {
        RESTService.changeComplaintToEmAndamento(queixa.id);
    }

    $scope.closeComplaint = function(queixa) {
        RESTService.closeComplaint(queixa);
    }
});

app.controller("searchHealthUnitCtrl", function ($scope, RESTService) {

    $scope.units = [];

    $scope.searchHU = function (neighborhood) {
        RESTService.searchHU(neighborhood)
            .then(function success(response) {
                $scope.units = [];
                $scope.units.push(response.data);
                console.log("Foram encontradas Unidades de saúde");
                console.log(response.data);
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
    }
});

app.controller("loginAdminCtrl", function ($location, $rootScope, $scope, RESTService) {
    RESTService.registerAdmin({
        email: "admin@admin.com",
        senha: "12345"
    });
    
    $scope.login = function (adm) {
        RESTService.logAdmin(adm)
        .then(function success(response) {
            $rootScope.isLogged = true;
            $location.path('/adm');
        }, function failed(error) {
            console.log(error);
            alert("Usuario ou senha incorretos");
        });
        console.log($rootScope.isLogged);
    }

});

app.controller("adminOptionsCtrl", function ($scope, RESTService) {

    $scope.us = {};
    $scope.situation = "";

    $scope.changeToNormal = function() {
        RESTService.changeToNormal();
    } 
    $scope.changeToExtra = function() {
        RESTService.changeToExtra();
    } 
    $scope.changeToCaos = function() {
        RESTService.changeToCaos();
    }

    $scope.registerUS = function(us) {
        RESTService.registerUS(us)
        .then(function success(response) {
            alert("Unidade de saude cadastrada com sucesso.");
        }, function failed(error) {
            alert("Ocorreu um erro :/");
        });
    }

    $scope.registerAdmin = function(adm) {
        RESTService.registerAdmin(adm);
    }

    var getGeneralSituationComplaints = function (neighborhood) {
        RESTService.getGeneralSituationComplaints(neighborhood)
            .then(function success(response) {
                console.log(response.data.obj);

                if(response.data.obj == 0){
                    $scope.situation = {
                        status: "RUIM",
                        color: "label-danger"
                    };

                } else if(response.data.obj == 1){

                    $scope.situation = {
                        status: "REGULAR",
                        color: "label-primary"
                    };
                } else {
                    $scope.situation = "";
                    $scope.situation = {
                        status: "BOM",
                        color: "label-success"
                    };
                    
                }
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
    }



    getGeneralSituationComplaints();

});

/*
    Metodo parecido com o de consultar a unidade de saude, porem eh passado especialidade ao inves do bairro

    Nao sei se esta certo
*/
app.controller("searchEspecialityCtrl", function ($scope, RESTService) {

    $scope.units = [];

    $scope.searchEspeciality = function (especiality) {
        RESTService.searchEspeciality(especiality)
            .then(function success(response) {
                $scope.units = [];
                $scope.units.push(response.data);
                console.log(response.data);
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
    }
});

app.controller("messageCreatedComplaintCtrl", function ($scope, $routeParams) {
    $scope.responseComplaintId = "";
    var showMessage = function () {
        $scope.responseComplaintId = $routeParams.id;
    }

    showMessage();
});
