// referente ao detalhamento
function fundoTransparenteDetalhar(){
    document.getElementById('fundoTransparenteDetalhar').style.display = 'none'
    document.getElementById('containerFormDetalhar').style.display = 'none'
}

function abrir_detalhamento(){

    document.getElementById('fundoTransparenteDetalhar').style.display = 'flex'
    document.getElementById('containerFormDetalhar').style.display = 'block'

    table = document.getElementById('tableTask')

    for (var i = 0; i < table.rows.length; i++){
        table.rows[i].onclick = function(){
            index = this.rowIndex;
            document.querySelector('#id_Detalhamento').value = table.rows[index].cells[0].innerText
            document.querySelector('#titulo_Detalhamento').value = table.rows[index].cells[2].innerText
            document.querySelector('#prioridade_Detalhamento').value = table.rows[index].cells[1].innerText
            document.querySelector('#status_Detalhamento').value = table.rows[index].cells[3].innerText
            document.querySelector('#datacriacao_Detalhamento').value = table.rows[index].cells[8].innerText
            document.querySelector('#dataconclusao_Detalhamento').value = table.rows[index].cells[6].innerText
            document.querySelector('#descricao_Detalhamento').value = table.rows[index].cells[7].innerText            
        }
    }
}

const fecha_detalhamento = document.getElementById('buttonCancelarDetalhamento')
fecha_detalhamento.addEventListener('click', function(e){
    e.preventDefault()

    fundoTransparenteDetalhar()

    document.querySelector('#id_Detalhamento').value = ''
    document.querySelector('#titulo_Detalhamento').value = ''
    document.querySelector('#prioridade_Detalhamento').value = ''
    document.querySelector('#status_Detalhamento').value = ''
    document.querySelector('#datacriacao_Detalhamento').value = ''
    document.querySelector('#dataconclusao_Detalhamento').value = ''
    document.querySelector('#descricao_Detalhamento').value = ''
})

const buttonSalvarDetalhamento = document.getElementById('buttonSalvarDetalhamento')
buttonSalvarDetalhamento.addEventListener('click', function(e){
    if(document.getElementById('titulo_Detalhamento').value.length == 0){
        e.preventDefault()
        alert('O titulo e obrigatório')
    }
})

// Referente ao criar task
function fundoTransparenteCriarTask(){
    document.getElementById('fundoTransparenteCriarTask').style.display = 'none'
    document.getElementById('containerFormCriarTask').style.display = 'none'
}

function abrir_CriarTask(){
    document.getElementById('fundoTransparenteCriarTask').style.display = 'flex'
    document.getElementById('containerFormCriarTask').style.display = 'block'
}

const fecha_criartask = document.getElementById('buttonCancelarCriarTask')
fecha_criartask.addEventListener('click', function(e){
    e.preventDefault()

    fundoTransparenteCriarTask()

    document.querySelector('#titulo_CriarTask').value = ''
    document.querySelector('#prioridade_CriarTask').value = ''
    document.querySelector('#status_CriarTask').value = ''
    document.querySelector('#descricao_CriarTask').value = ''
})

const buttonSalvarCriarTask = document.getElementById('buttonSalvarCriarTask')
buttonSalvarCriarTask.addEventListener('click', function(e){
    if(document.getElementById('titulo_CriarTask').value.length == 0){
        e.preventDefault()
        alert('O titulo e obrigatório')
    }
})

// referente a confirmação do delete

const buttonDeletarDetalhamento = document.getElementById('buttonDeletarDetalhamento')
buttonDeletarDetalhamento.addEventListener('click', (e)=>{
    e.preventDefault()

    document.getElementById('containerconfimardeletetask').style.display = 'block'
    document.getElementById('fundoTransparenteDeleteTask').style.display = 'block'
    
    document.getElementById('id_Deletatask').value = document.getElementById('id_Detalhamento').value
})

const buttonNaoDelete = document.getElementById('buttonNaoDelete')
buttonNaoDelete.addEventListener('click', (e)=>{
    e.preventDefault()

    document.getElementById('containerconfimardeletetask').style.display = 'none'
    document.getElementById('fundoTransparenteDeleteTask').style.display = 'none'
})

////////////////////////////////////////////////////
///////////////////// FILTRO ///////////////////////
////////////////////////////////////////////////////

function filtrarTabela() {
    tabela = document.getElementById("tableTask");
    var nomeTask = document.getElementById("filtraNomeTask").value;

    for (var i = 0; i < tabela.rows.length; i++) {
        if (i >= 2) {
            var dataTabela = tabela.rows[i].cells[2].innerText;
            var posicao = dataTabela.toUpperCase().includes(nomeTask.toUpperCase())
            if (posicao !== true) {
                tabela.rows[i].style.display = "none";
            } else {
                tabela.rows[i].style.display = "";
            }
        }
    }
}

function abreFiltroTask(){
    document.getElementById('fundoTransparenteFiltroTask').style.display = 'flex'
}

function fecharFiltroTask(){
    document.getElementById('fundoTransparenteFiltroTask').style.display = 'none'
    limpaFiltroData()
    limpaFiltroSelecao()
}

function limpaFiltroSelecao(){
    document.getElementById("selectPrioridadeTask").selectedIndex = -1;
    document.getElementById("selectStatusTask").selectedIndex = -1;

    const MenuFiltroCategoria = document.getElementById('MenuFiltroCategoria')
    MenuFiltroCategoria.style.display = 'none'
}

function limpaFiltroData(){
    document.getElementById('dataInicioFiltroTask').value = 'dd/mm/aaaa'
    document.getElementById('dataFimFiltroTask').value = 'dd/mm/aaaa'
    const MenuFiltroData = document.getElementById('MenuFiltroData')
    MenuFiltroData.style.display = 'none'
}

function aplicarFiltroTask(){
    var datainicio = document.getElementById('dataInicioFiltroTask')
    var dataInicio = Number(datainicio.value.substring(8,10)+datainicio.value.substring(5,7)+datainicio.value.substring(0,4))

    var datafim = document.getElementById('dataFimFiltroTask').value
    var dataFim = Number(datafim.substring(8,10)+datafim.substring(5,7)+datafim.substring(0,4))

    tabela = document.getElementById("tableTask");

    var selectpriodidade = document.getElementById("selectPrioridadeTask").selectedOptions;
    // verificar as prioridades marcadas
    for (var index02 = 0; index02 < selectpriodidade.length; index02++) {
        if (index02 == 0) { var opcaoP1 = selectpriodidade[index02].value }
        if (index02 == 1) { var opcaoP2 = selectpriodidade[index02].value }
        if (index02 == 2) { var opcaoP3 = selectpriodidade[index02].value }
    }

    var selectstatus = document.getElementById("selectStatusTask").selectedOptions;
    // verificar os status marcados
    for (var index03 = 0; index03 < selectstatus.length; index03++) {
        if (index03 == 0) { var opcaoS1 = selectstatus[index03].value }
        if (index03 == 1) { var opcaoS2 = selectstatus[index03].value }
        if (index03 == 2) { var opcaoS3 = selectstatus[index03].value }
    }

    for (var i3 = 0; i3 < tabela.rows.length; i3++) {
        if (i3 >= 2) {

            var pTable = tabela.rows[i3].cells[1].innerText
            var sTable = tabela.rows[i3].cells[3].innerText

            if (selectpriodidade.length != 0 && selectstatus.length == 0) {
                if (opcaoP1 == pTable || opcaoP2 == pTable || opcaoP3 == pTable) {
                    tabela.rows[i3].style.display = "";
                } else {
                    tabela.rows[i3].style.display = "none";
                }
            }

            if (selectpriodidade.length == 0 && selectstatus.length != 0) {
                if (opcaoS1 == sTable || opcaoS2 == sTable || opcaoS3 == sTable) {
                    tabela.rows[i3].style.display = "";
                } else {
                    tabela.rows[i3].style.display = "none";
                }
            }

            if (selectpriodidade.length != 0 && selectstatus.length != 0) {
                if (data < dataInicio || data > dataFim) {
                    tabela.rows[i3].style.display = "none";
                } else {
                    tabela.rows[i3].style.display = "";
                }

                if ((opcaoP1 == pTable || opcaoP2 == pTable || opcaoP3 == pTable)&&
                (opcaoS1 == sTable || opcaoS2 == sTable || opcaoS3 == sTable)) {
                    tabela.rows[i3].style.display = "";
                } else {
                    tabela.rows[i3].style.display = "none";
                }
            }

            if (dataInicio != 0 && dataFim != 0) {
                var data = tabela.rows[i3].cells[4].innerHTML
                data = Number(data.replace('/','').replace('/',''))

                if (data < dataInicio || data > dataFim) {
                    tabela.rows[i3].style.display = "none";
                } else {
                    tabela.rows[i3].style.display = "";
                }
            }
        }
    }

    fecharFiltroTask()
}

function abreMenuFiltroCategoria(){
    const MenuFiltroCategoria = document.getElementById('MenuFiltroCategoria')

    if (MenuFiltroCategoria.style.display == 'none') {
        MenuFiltroCategoria.style.display = 'flex'
        limpaFiltroData()
    } else {
        MenuFiltroCategoria.style.display = 'none'
    }
}

function abreMenuFiltroData(){
    const MenuFiltroData = document.getElementById('MenuFiltroData')

    if (MenuFiltroData.style.display == 'none') {
        MenuFiltroData.style.display = 'flex'
        limpaFiltroSelecao()
    } else {
        MenuFiltroData.style.display = 'none'
    }
}

function LimparFiltroTask(){
    document.getElementById("filtraNomeTask").value = ''
    filtrarTabela()
}