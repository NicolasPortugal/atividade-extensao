function atualizarTotal() {
  const checkboxes = document.querySelectorAll(".item-check");
  let total = 0;

  checkboxes.forEach((check) => {
    if (check.checked) {
      const linha = check.closest("tr");
      total += parseFloat(linha.querySelector(".subtotal").textContent);
    }
  });

  document.getElementById("total").textContent = "Total: R$ " + total.toFixed(2).replace('.', ',');
}

// Remover item do carrinho
document.querySelectorAll(".remove-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const linha = e.target.closest("tr");
    linha.remove();
    atualizarTotal();
  });
});

// Atualiza o total ao marcar/desmarcar produtos
document.querySelectorAll(".item-check").forEach(check => {
  check.addEventListener("change", atualizarTotal);
});

// Finalizar compra
document.getElementById("finalizar-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const selecionados = document.querySelectorAll(".item-check:checked");
  if (selecionados.length === 0) {
    alert("Selecione ao menos um item para comprar.");
    return;
  }
  alert("Compra finalizada com sucesso! (" + selecionados.length + " item(s))");
});

// Atualiza total inicial
atualizarTotal();