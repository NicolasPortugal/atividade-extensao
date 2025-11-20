function atualizarTudo() {
  let total = 0;
  let anyChecked = false;

  document.querySelectorAll("tbody tr").forEach(row => {
    const check = row.querySelector(".item-check");
    const subtotal = parseFloat(row.querySelector(".subtotal").textContent);

    // fundo azul quando marcado
    row.classList.toggle("selected", check.checked);

    if (check.checked) {
      total += subtotal;
      anyChecked = true;
    }
  });

  // atualizar total
  document.getElementById("total").textContent =
    `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

  // ativar/desativar botão de finalizar
  const btn = document.getElementById("finalizar-btn");
  btn.style.pointerEvents = anyChecked ? "auto" : "none";
  btn.style.opacity = anyChecked ? "1" : "0.5";
}

// remover item
document.querySelectorAll(".remove-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const linha = e.target.closest("tr");
    linha.remove();
    atualizarTudo();
  });
});

// marcar/desmarcar individual
document.querySelectorAll(".item-check").forEach(ch => {
  ch.addEventListener("change", atualizarTudo);
});

// selecionar tudo (select-all)
document.getElementById("select-all").addEventListener("change", function () {
  document.querySelectorAll(".item-check").forEach(ch => {
    ch.checked = this.checked;
    ch.dispatchEvent(new Event("change")); // força atualização do fundo e total
  });
});

// finalizar compra
document.getElementById("finalizar-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const selecionados = document.querySelectorAll(".item-check:checked");

  if (selecionados.length === 0) {
    alert("Selecione ao menos um item para comprar.");
    return;
  }

  alert(`Compra finalizada com sucesso! (${selecionados.length} item(s))`);
});

// atualizar ao iniciar
atualizarTudo();
