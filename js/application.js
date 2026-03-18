const form = document.getElementById('cadastroForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const strengthBar = document.getElementById('strength-bar');

nome.addEventListener('blur', () => validarCampo(nome, validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));
senha.addEventListener('input', () => { validarCampo(senha, validarSenha); atualizarForcaSenha(senha.value); if (confirmarSenha.value) validarCampo(confirmarSenha, validarConfirmarSenha); });
senha.addEventListener('blur', () => validarCampo(senha, validarSenha));
confirmarSenha.addEventListener('blur', () => validarCampo(confirmarSenha, validarConfirmarSenha));
confirmarSenha.addEventListener('input', () => validarCampo(confirmarSenha, validarConfirmarSenha));

function validarCampo(input, funcaoValidadora) {
    const msgErro = document.getElementById(input.id + '-error');
    const resultado = funcaoValidadora(input.value);
    
    if (!resultado.valido) {
        input.classList.add('error');
        input.classList.remove('success');
        msgErro.textContent = resultado.mensagem;
        return false;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        msgErro.textContent = '';
        return true;
    }
}

function validarNome(valor) {
    if (!valor.trim()) return { valido: false, mensagem: '⚠️ Nome é obrigatório' };
    if (valor.trim().length < 3) return { valido: false, mensagem: '⚠️ Mínimo 3 caracteres' };
    return { valido: true };
}

function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valor) return { valido: false, mensagem: '⚠️ E-mail obrigatório' };
    if (!regex.test(valor)) return { valido: false, mensagem: '⚠️ Formato inválido' };
    return { valido: true };
}

function validarSenha(valor) {
    if (valor.length < 8) return { valido: false, mensagem: '⚠️ Mínimo 8 caracteres' };
    if (!/[A-Z]/.test(valor)) return { valido: false, mensagem: '⚠️ Precisa de 1 letra maiúscula' };
    if (!/[0-9]/.test(valor)) return { valido: false, mensagem: '⚠️ Precisa de 1 número' };
    return { valido: true };
}

function validarConfirmarSenha(valor) {
    if (!valor) return { valido: false, mensagem: '⚠️ Confirmação obrigatória' };
    if (valor !== senha.value) return { valido: false, mensagem: '⚠️ As senhas não coincidem' };
    return { valido: true };
}

function atualizarForcaSenha(valor) {
    let forca = 0;
    if (valor.length >= 8) forca += 1;
    if (/[A-Z]/.test(valor)) forca += 1;
    if (/[0-9]/.test(valor)) forca += 1;
    if (/[^A-Za-z0-9]/.test(valor)) forca += 1;

    strengthBar.className = 'strength-bar';
    
    if (valor.length === 0) {
        strengthBar.style.width = '0';
    } else if (forca <= 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = 'var(--vermelho)';
    } else if (forca === 2) {
        strengthBar.style.width = '50%';
        strengthBar.style.backgroundColor = 'var(--laranja)';
    } else if (forca === 3) {
        strengthBar.style.width = '75%';
        strengthBar.style.backgroundColor = 'var(--amarelo)';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--verde)';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNomeValido = validarCampo(nome, validarNome);
    const isEmailValido = validarCampo(email, validarEmail);
    const isSenhaValida = validarCampo(senha, validarSenha);
    const isConfirmarSenhaValida = validarCampo(confirmarSenha, validarConfirmarSenha);

    if (isNomeValido && isEmailValido && isSenhaValida && isConfirmarSenhaValida) {
        const btn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        const successAlert = document.getElementById('success-msg');

        btn.disabled = true;
        btnText.textContent = 'Enviando...';
        btnSpinner.style.display = 'inline-block';
        successAlert.style.display = 'none';

        setTimeout(() => {
            btn.disabled = false;
            btnText.textContent = 'Criar Conta';
            btnSpinner.style.display = 'none';
            
            form.reset();
            document.querySelectorAll('.success, .error').forEach(el => el.classList.remove('success', 'error'));
            strengthBar.style.width = '0';
            
            successAlert.textContent = '✅ Conta criada com sucesso!';
            successAlert.style.display = 'block';
            
            setTimeout(() => successAlert.style.display = 'none', 5000);
        }, 2000);
    }
});