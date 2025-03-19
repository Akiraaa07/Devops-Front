// Função para cadastrar médico
document.getElementById('medico-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Previne o comportamento padrão de envio do formulário

    const nome = document.getElementById('medico-nome').value;
    const email = document.getElementById('medico-email').value;
    const crm = document.getElementById('medico-crm').value;
    const telefone = document.getElementById('medico-telefone').value;

    try {
        const response = await fetch('http://localhost:3000/api/medicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                crm: crm,
                telefone: telefone
            })
        });

        const result = await response.json();  // Obter a resposta do servidor em formato JSON

        if (response.ok) {
            alert('Médico cadastrado com sucesso!');
            document.getElementById('medico-form').reset();
        } else {
            alert(`Erro ao cadastrar médico: ${result.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro de comunicação:', err);
        alert('Erro de comunicação com o servidor.');
    }
});

// Função para cadastrar paciente
document.getElementById('paciente-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Previne o comportamento padrão de envio do formulário

    const nome = document.getElementById('paciente-nome').value;
    const email = document.getElementById('paciente-email').value;
    const data_nascimento = document.getElementById('paciente-data-nascimento').value;
    const telefone = document.getElementById('paciente-telefone').value;
    const id_medico = document.getElementById('paciente-id-medico').value;

    try {
        const response = await fetch('http://localhost:3000/api/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                data_nascimento: data_nascimento,
                telefone: telefone,
                id_medico: id_medico
            })
        });

        const result = await response.json();  // Obter a resposta do servidor em formato JSON

        if (response.ok) {
            alert('Paciente cadastrado com sucesso!');
            document.getElementById('paciente-form').reset();
        } else {
            alert(`Erro ao cadastrar paciente: ${result.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro de comunicação:', err);
        alert('Erro de comunicação com o servidor.');
    }
});