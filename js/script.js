/* Insere o header dinamicamente */
(function () {
    const headerContainer = document.getElementById("site-header");
    if (!headerContainer) return;

    headerContainer.innerHTML = `
        <header class="site-header">
            <div class="container header-inner">
                <a href="./index.html" class="logo" aria-label="Página inicial">
                    <img src="./img/LogoSVG.svg" alt="Logo da loja" class="logo-img" />
                </a>

                <nav class="nav" aria-label="Navegação principal">
                    <ul class="nav-list">
                        <li><a href="./index.html">Início</a></li>
                        <li><a href="./loja.html">Loja</a></li>
                    </ul>
                </nav>

                <a href="./cart.html" class="cart-link" aria-label="Ir para o carrinho">
                    <img src="./img/iconeCarrinhoSVG.svg" alt="Ícone do carrinho" class="cart-icon" />
                    <span id="cart-count">0</span>
                    <span id="cart-total">R$ 0,00</span>
                </a>
            </div>
        </header>
    `;
})();
  

/* Atualiza o carrinho se existir */
function atualizarCarrinho() {
    const table = document.querySelector("#cart-table tbody");
    if (!table) return; // se não estiver no cart.html, parar

    let total = 0;
    let anyChecked = false;

    document.querySelectorAll("tbody tr").forEach(row => {
        const check = row.querySelector(".item-check");
        const subtotal = parseFloat(row.querySelector(".subtotal").textContent);

        row.classList.toggle("selected", check.checked);

        if (check.checked) {
            total += subtotal;
            anyChecked = true;
        }
    });

    const totalEl = document.getElementById("total");
    if (totalEl) {
        totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    const btn = document.getElementById("finalizar-btn");
    if (btn) {
        btn.style.pointerEvents = anyChecked ? "auto" : "none";
        btn.style.opacity = anyChecked ? "1" : "0.5";
    }

    atualizarHeaderContador();
}


/* Atualiza contagem e valor no header */
function atualizarHeaderContador() {
    const rows = document.querySelectorAll("tbody tr");
    let quantidade = rows.length;
    let total = 0;

    rows.forEach(row => {
        const subtotal = parseFloat(row.querySelector(".subtotal").textContent);
        total += subtotal;
    });

    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");

    if (countEl) countEl.textContent = quantidade;
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}


/* Eventos do cart.html */
document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector("#cart-table")) return;

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const linha = e.target.closest("tr");
            linha.remove();
            atualizarCarrinho();
        });
    });

    document.querySelectorAll(".item-check").forEach(ch => {
        ch.addEventListener("change", atualizarCarrinho);
    });

    const selectAll = document.getElementById("select-all");
    if (selectAll) {
        selectAll.addEventListener("change", function () {
            document.querySelectorAll(".item-check").forEach(ch => {
                ch.checked = this.checked;
                ch.dispatchEvent(new Event("change"));
            });
        });
    }

    const finalizar = document.getElementById("finalizar-btn");
    if (finalizar) {
        finalizar.addEventListener("click", (e) => {
            e.preventDefault();
            const selecionados = document.querySelectorAll(".item-check:checked");

            if (selecionados.length === 0) {
                alert("Selecione ao menos um item para comprar.");
                return;
            }

            alert(`Compra finalizada com sucesso! (${selecionados.length} item(s))`);
        });
    }

    atualizarCarrinho();
});
