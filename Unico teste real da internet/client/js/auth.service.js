app.service('authService', authService);

function authService(usuarioService, $http) {           

    return {
        isLogado: () =>  !!localStorage.getItem('usuario'),        
        signIn: signIn,
        signOut: signOut,      
    } 

    function isUsuarioCadastrado(){
        let id;
        if(localStorage.usuario)
            id = JSON.parse(localStorage.usuario).id;
        return usuarioService.getUsuarioPorId(id);
    }

    function signOut() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.disconnect();
        localStorage.removeItem('usuario');        
    }

    function signIn(atualizar) {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signIn().then(() => {
            let googleUser = googleAuth.currentUser.get();
            let profile = googleUser.getBasicProfile();
            let usuario;
            usuarioService.usuarioJaCadastrado(profile.getId()).then((result)=>{
                usuario = result.data[0];
                localStorage.usuario = JSON.stringify(usuario);
            }
            ,(fail)=>{
                usuarioService.criarUsuario({
                    'id_google': profile.getId(),
                    'nome': profile.getName(),
                    'descricao': '',
                    'url_foto': profile.getImageUrl(),
                    'pontuacao': 0
                }).then((user)=>{
                    localStorage.usuario = JSON.stringifu(user.data);
                })
            }).finally(atualizar);                                       
        });
    }
}