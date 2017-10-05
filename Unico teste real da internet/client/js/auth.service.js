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
            let token = googleUser.getAuthResponse().id_token;
            let profile = googleUser.getBasicProfile();


            console.log(token);

            
            usuarioService.getUsuarioPorId(id).then(response => {
                localStorage.usuario = JSON.stringify(response.data);
            }, fail => {

                localStorage.usuario = JSON.stringify({
                    'nome': profile.getName(),
                    'email': profile.getEmail(),
                    'foto': profile.getImageUrl(),
                    'nota': 0
                });

                let usuario = JSON.parse(localStorage.usuario);
                usuarioService.criarUsuario(usuario);
            }).finally(atualizar);                                       
        });
    }
}