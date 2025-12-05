// Insere o header dinamicamente
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
                    <span id="cart-count">0</span>
                    <img src="./img/iconeCarrinhoSVG.svg" alt="Ícone do carrinho" class="cart-icon" />
                    <span id="cart-total">R$ 0,00</span>
                </a>
            </div>
        </header>
    `;
})();

// Atualiza o header com quantidade e total
function atualizarHeaderContador() {
    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];

    const quantidade = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = cart.reduce((sum, item) => {
        const price = item.price || 0;
        const qtd = item.quantity || 1;
        return sum + price * qtd;
    }, 0);

    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");

    if (countEl) countEl.textContent = quantidade;
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Atualiza a tabela do carrinho
function atualizarCarrinho() {
    const table = document.querySelector("#cart-table tbody");
    if (!table) return;

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
    if (totalEl) totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

    const btn = document.getElementById("finalizar-btn");
    if (btn) {
        btn.style.pointerEvents = anyChecked ? "auto" : "none";
        btn.style.opacity = anyChecked ? "1" : "0.5";
    }

    atualizarHeaderContador();
}

// Eventos do carrinho
document.addEventListener("DOMContentLoaded", () => {
    const isCartPage = document.querySelector("#cart-table");

    atualizarHeaderContador(); // Atualiza header em todas as páginas

    if (!isCartPage) return; // Só executa abaixo se estiver no carrinho

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Verifica se o usuário confirma a ação
            if (!confirm("Tem certeza que deseja remover este item?")) return;

            const linha = e.target.closest("tr");

            // Remove item do localStorage
            const nome = linha.getAttribute("data-nome");
            let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
            cart = cart.filter(item => item.nome !== nome);
            localStorage.setItem("carrinho", JSON.stringify(cart));

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
