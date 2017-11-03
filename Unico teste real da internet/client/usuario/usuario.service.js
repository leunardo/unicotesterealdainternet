app.service('usuarioService', usuarioService);

function usuarioService($http, URL) {
    let url = URL;

    return {
        getUsuario: getUsuario,
        criarUsuario: criarUsuario,
        getUsuarioPorId: getUsuarioPorId,
        atualizarPerfil: atualizarPerfil,
        usuarioJaCadastrado: usuarioJaCadastrado
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

    function usuarioJaCadastrado(id_google) {
        return $http.get(`${url}/usuarios/gid/${id_google}`);
    }

    function atualizarPerfil(usuario, token){        
        return $http.put(`${url}/usuarios/${usuario.id_usuario}`, usuario, token);
    }

}