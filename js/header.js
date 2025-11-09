// js/header.js
(function () {
    // Encontra o elemento onde o header será injectado
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    // logo, menu e ícone do carrinho em html
    const headerHTML = `
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
        </a>
      </div>
    </header>
  `;

    // header no DOM
    headerContainer.innerHTML = headerHTML;
})();
