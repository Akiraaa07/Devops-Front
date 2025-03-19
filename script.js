// Função para cadastrar médico
document.getElementById('medico-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const medicoData = {
      nome: document.getElementById('medico-nome').value,
      email: document.getElementById('medico-email').value,
      crm: document.getElementById('medico-crm').value,
      telefone: document.getElementById('medico-telefone').value,
  };

  try {
      const response = await fetch('http://localhost:3000/api/medicos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medicoData),
      });

      const result = await response.json();

      if (response.ok) {
          alert('Médico cadastrado com sucesso!');
          document.getElementById('medico-form').reset();
          fetchMedicos(); // Atualiza a lista de médicos
      } else {
          alert(`Erro ao cadastrar médico: ${result.message || 'Erro desconhecido'}`);
      }
  } catch (err) {
      console.error('Erro de comunicação:', err);
      alert('Erro de comunicação com o servidor.');
  }
});

// Função para cadastrar paciente
document.getElementById('paciente-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const pacienteData = {
      nome: document.getElementById('paciente-nome').value,
      email: document.getElementById('paciente-email').value,
      data_nascimento: document.getElementById('paciente-data-nascimento').value,
      telefone: document.getElementById('paciente-telefone').value,
      id_medico: document.getElementById('paciente-id-medico').value,
  };

  try {
      const response = await fetch('http://localhost:3000/api/pacientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pacienteData),
      });

      const result = await response.json();

      if (response.ok) {
          alert('Paciente cadastrado com sucesso!');
          document.getElementById('paciente-form').reset();
          fetchPacientes(); // Atualiza a lista de pacientes
      } else {
          alert(`Erro ao cadastrar paciente: ${result.message || 'Erro desconhecido'}`);
      }
  } catch (err) {
      console.error('Erro de comunicação:', err);
      alert('Erro de comunicação com o servidor.');
  }
});

// Função para buscar e exibir médicos cadastrados
async function fetchMedicos() {
  try {
      const response = await fetch('http://localhost:3000/api/medicos');
      const data = await response.json();
      const medicos = data.data || [];

      if (Array.isArray(medicos)) {
          const tableBody = document.getElementById('medicos-table').getElementsByTagName('tbody')[0];
          tableBody.innerHTML = ''; // Limpa a tabela

          medicos.forEach(medico => {
              const row = tableBody.insertRow();
              row.innerHTML = `
                  <td>${medico.ID_MEDICO}</td>
                  <td>${medico.NOME}</td>
                  <td>${medico.EMAIL}</td>
                  <td>${medico.CRM}</td>
                  <td>${medico.TELEFONE}</td>
              `;
          });
      } else {
          console.error('A resposta não contém um array válido:', data);
          alert('Erro ao carregar médicos cadastrados.');
      }
  } catch (err) {
      console.error('Erro ao buscar médicos:', err);
      alert('Erro ao buscar médicos cadastrados.');
  }
}

// Função para buscar e exibir pacientes cadastrados
async function fetchPacientes() {
  try {
      const response = await fetch('http://localhost:3000/api/pacientes');
      const data = await response.json();
      const pacientes = data.data || [];

      if (Array.isArray(pacientes)) {
          const tableBody = document.getElementById('pacientes-table').getElementsByTagName('tbody')[0];
          tableBody.innerHTML = ''; // Limpa a tabela

          pacientes.forEach(paciente => {
              const row = tableBody.insertRow();
              row.innerHTML = `
                  <td>${paciente.ID_PACIENTE}</td>
                  <td>${paciente.NOME}</td>
                  <td>${paciente.EMAIL}</td>
                  <td>${new Date(paciente.DATA_NASCIMENTO).toLocaleDateString()}</td>
                  <td>${paciente.TELEFONE}</td>
                  <td>${paciente.ID_MEDICO}</td>
              `;
          });
      } else {
          console.error('A resposta não contém um array válido:', data);
          alert('Erro ao carregar pacientes cadastrados.');
      }
  } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      alert('Erro ao buscar pacientes cadastrados.');
  }
}

// Chama as funções para carregar os dados assim que a página for carregada
window.onload = () => {
  fetchMedicos();
  fetchPacientes();
};