app.service('usuarioService', usuarioService);

function usuarioService($http, URL) {
    let url = URL;

    return {
        getUsuario: getUsuario,
        criarUsuario: criarUsuario,
        getUsuarioPorId: getUsuarioPorId,
    }

    function getUsuario() {
        return $http.get(`${url}/usuarios`);
    }

    function getUsuarioPorId(id) {
        return $http.get(`${url}/usuarios/${id}`);
    }

    function criarUsuario(usuario) {
        return $http.post(`${url}/usuarios`, usuario);
    }

}