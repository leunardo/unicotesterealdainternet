app.service('usuarioService', usuarioService);

function usuarioService($http, URL) {
    let url = URL;

    return {
        getUsuario: getUsuario,
        criarUsuario: criarUsuario,
        atualizarUsuario: atualizarNotaUsuario,
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

    function atualizarNotaUsuario(nota){
        let idUsuario = JSON.parse(localStorage.usuario).id;
        return $http.put(`${url}/usuarios/${id}`)
    }

}