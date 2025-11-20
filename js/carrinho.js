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

document.getElementById("select-all").addEventListener("change", function() {
  document.querySelectorAll(".item-check").forEach(ch => {
    ch.checked = this.checked;
  });
});

function checkSelected() {
  const any = [...document.querySelectorAll(".item-check")]
              .some(ch => ch.checked);
  document.getElementById("finalizar-btn").style.pointerEvents = any ? "auto" : "none";
  document.getElementById("finalizar-btn").style.opacity = any ? "1" : "0.5";
}

document.querySelectorAll(".item-check").forEach(ch => {
  ch.addEventListener("change", checkSelected);
});

checkSelected();

document.querySelectorAll(".item-check").forEach(ch => {
  ch.addEventListener("change", () => {
    const row = ch.closest("tr");
    row.classList.toggle("selected", ch.checked);
  });
});

function updateTotal() {
  let total = 0;
  document.querySelectorAll("tbody tr").forEach(row => {
    const checked = row.querySelector(".item-check").checked;
    const subtotal = parseFloat(row.querySelector(".subtotal").textContent);
    if (checked) total += subtotal;
  });

  document.getElementById("total").textContent =
    `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

document.querySelectorAll(".item-check").forEach(ch => {
  ch.addEventListener("change", updateTotal);
});

updateTotal();


// Atualiza total inicial
atualizarTotal();