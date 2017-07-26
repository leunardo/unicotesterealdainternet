app.service('authService', authService);

function authService() {           

    return {
        isLogado: () =>  !!localStorage.getItem('usuario'),        
        signIn: signIn,
        signOut: signOut,      
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
            localStorage.usuario = JSON.stringify({
                'nome': profile.getName(),
                'email': profile.getEmail(),
                'foto': profile.getImageUrl(),
            });
            atualizar();
        });
    }
}