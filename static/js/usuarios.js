function fundoTransparenteDetalhar(){
    document.getElementById('fundoTransparenteDetalhar').style.display = 'none'
    document.getElementById('containerFormDetalhar').style.display = 'none'
}

function abrir_detalhamento(){
    document.getElementById('fundoTransparenteDetalhar').style.display = 'flex'
    document.getElementById('containerFormDetalhar').style.display = 'flex'

    tabela = document.getElementById('tableUsuarios')

    for (var i = 0; i < tabela.rows.length; i++) {
        tabela.rows[i].onclick = function(){
            index = this.rowIndex;
            document.querySelector('#id_usuario').value = tabela.rows[index].cells[0].innerText
            document.querySelector('#Usuario').value = tabela.rows[index].cells[1].innerText
            document.querySelector('#Nome').value = tabela.rows[index].cells[2].innerText
            document.querySelector('#mail').value = tabela.rows[index].cells[3].innerText
            document.querySelector('#tipoUsuario').value = tabela.rows[index].cells[4].innerText
        }
    }
}

const fechaFormDetalhar = document.getElementById('buttonCancelarDetalhamento')
fechaFormDetalhar.addEventListener('click', (e)=>{
    e.preventDefault()
    fundoTransparenteDetalhar()
})