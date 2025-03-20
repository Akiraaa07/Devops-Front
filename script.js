// Função para cadastrar ou atualizar médico
document.getElementById('medico-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const medicoData = {
        nome: document.getElementById('medico-nome').value,
        email: document.getElementById('medico-email').value,
        crm: document.getElementById('medico-crm').value,
        telefone: document.getElementById('medico-telefone').value,
    };

    const id = document.getElementById('medico-id').value; // Campo oculto para identificar se é edição

    try {
        const response = await fetch(`http://localhost:3000/api/medicos${id ? '/' + id : ''}`, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicoData),
        });

        const result = await response.json();

        if (response.ok) {
            alert(id ? 'Médico atualizado com sucesso!' : 'Médico cadastrado com sucesso!');
            document.getElementById('medico-form').reset();
            document.getElementById('medico-id').value = ''; // Resetar o campo oculto
            fetchMedicos(); // Atualizar a lista de médicos
        } else {
            alert(`Erro: ${result.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro de comunicação com o servidor.');
    }
});

// Função para deletar médico
async function deleteMedico(id) {
    if (!id) {
        alert('ID inválido.');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este médico?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/medicos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Médico excluído com sucesso!');
                fetchMedicos(); // Atualizar a lista de médicos
            } else {
                alert('Erro ao excluir médico.');
            }
        } catch (err) {
            console.error('Erro ao excluir médico:', err);
            alert('Erro de comunicação.');
        }
    }
}

// Função para buscar médicos e exibir na tabela
async function fetchMedicos() {
    try {
        const response = await fetch('http://localhost:3000/api/medicos');
        const data = await response.json();
        const medicos = data.data || [];

        const tableBody = document.getElementById('medicos-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpar a tabela antes de preencher

        medicos.forEach(medico => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${medico.ID_MEDICO}</td>
                <td>${medico.NOME}</td>
                <td>${medico.EMAIL}</td>
                <td>${medico.CRM}</td>
                <td>${medico.TELEFONE}</td>
                <td>
                    <button onclick="editMedico(${medico.ID_MEDICO}, '${medico.NOME}', '${medico.EMAIL}', '${medico.CRM}', '${medico.TELEFONE}')">Editar</button>
                    <button onclick="deleteMedico(${medico.ID_MEDICO})">Excluir</button>
                </td>
            `;
        });
    } catch (err) {
        console.error('Erro ao buscar médicos:', err);
        alert('Erro ao buscar médicos.');
    }
}

// Função para carregar dados no formulário para edição
function editMedico(id, nome, email, crm, telefone) {
    if (!id || !nome || !email || !crm || !telefone) {
        alert('Dados inválidos para edição.');
        return;
    }

    document.getElementById('medico-id').value = id; // Define ID oculto
    document.getElementById('medico-nome').value = nome;
    document.getElementById('medico-email').value = email;
    document.getElementById('medico-crm').value = crm;
    document.getElementById('medico-telefone').value = telefone;
}

// Função para cadastrar ou atualizar paciente
document.getElementById('paciente-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const pacienteData = {
        nome: document.getElementById('paciente-nome').value,
        email: document.getElementById('paciente-email').value,
        data_nascimento: document.getElementById('paciente-data-nascimento').value,
        telefone: document.getElementById('paciente-telefone').value,
        id_medico: document.getElementById('paciente-id-medico').value,
    };

    const id = document.getElementById('paciente-id').value; // Campo oculto para identificar se é edição

    try {
        const response = await fetch(`http://localhost:3000/api/pacientes${id ? '/' + id : ''}`, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pacienteData),
        });

        const result = await response.json();

        if (response.ok) {
            alert(id ? 'Paciente atualizado com sucesso!' : 'Paciente cadastrado com sucesso!');
            document.getElementById('paciente-form').reset();
            document.getElementById('paciente-id').value = ''; // Resetar o campo oculto
            fetchPacientes(); // Atualizar a lista de pacientes
        } else {
            alert(`Erro: ${result.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro de comunicação com o servidor.');
    }
});

// Função para deletar paciente
async function deletePaciente(id) {
    if (!id) {
        alert('ID inválido.');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/pacientes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Paciente excluído com sucesso!');
                fetchPacientes(); // Atualizar a lista de pacientes
            } else {
                alert('Erro ao excluir paciente.');
            }
        } catch (err) {
            console.error('Erro ao excluir paciente:', err);
            alert('Erro de comunicação.');
        }
    }
}

// Função para buscar pacientes e exibir na tabela
async function fetchPacientes() {
    try {
        const response = await fetch('http://localhost:3000/api/pacientes');
        const data = await response.json();
        const pacientes = data.data || [];

        const tableBody = document.getElementById('pacientes-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpar a tabela antes de preencher

        pacientes.forEach(paciente => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${paciente.ID_PACIENTE}</td>
                <td>${paciente.NOME}</td>
                <td>${paciente.EMAIL}</td>
                <td>${new Date(paciente.DATA_NASCIMENTO).toLocaleDateString()}</td>
                <td>${paciente.TELEFONE}</td>
                <td>${paciente.ID_MEDICO}</td>
                <td>
                    <button onclick="editPaciente(${paciente.ID_PACIENTE}, '${paciente.NOME}', '${paciente.EMAIL}', '${paciente.DATA_NASCIMENTO}', '${paciente.TELEFONE}', ${paciente.ID_MEDICO})">Editar</button>
                    <button onclick="deletePaciente(${paciente.ID_PACIENTE})">Excluir</button>
                </td>
            `;
        });
    } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        alert('Erro ao buscar pacientes.');
    }
}

// Função para carregar dados no formulário para edição
function editPaciente(id, nome, email, data_nascimento, telefone, id_medico) {
    if (!id || !nome || !email || !data_nascimento || !telefone || !id_medico) {
        alert('Dados inválidos para edição.');
        return;
    }

    document.getElementById('paciente-id').value = id;
    document.getElementById('paciente-nome').value = nome;
    document.getElementById('paciente-email').value = email;
    document.getElementById('paciente-data-nascimento').value = data_nascimento.split('T')[0];
    document.getElementById('paciente-telefone').value = telefone;
    document.getElementById('paciente-id-medico').value = id_medico;
}

// Carregar médicos e pacientes ao iniciar
window.onload = () => {
    fetchMedicos();
    fetchPacientes();
};