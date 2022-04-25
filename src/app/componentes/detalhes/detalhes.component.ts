import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  public produtoDetalhe: Produto;
  public quantidade: number;

  constructor(private route: ActivatedRoute, 
              private service: ProdutoService,
              private carService: CarrinhoService,
              private nav: Router) { 
    this.quantidade = 1;
  }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      this.recuperaProduto(parameter["id"]);
    })
  }

  public recuperaProduto(id: number) {
    this.service.getProdutoPeloId(id).subscribe( 
      (prod: Produto) => this.produtoDetalhe = prod,
      erro => { alert("produto invalido")}
      );
  }

  public adicionarCarrinho() {
    let pedido: Pedido;
    pedido = JSON.parse(localStorage.getItem("ShoppingCart"));
    if (!pedido) { // se não existir, cria um novo pedido
      pedido = new Pedido();
      pedido.valorTotal = 0;
      pedido.itensPedido = [];
    }

    let item: ItemPedido;
    item = new ItemPedido();
    item.qtdeItem = this.quantidade;
    item.produto = this.produtoDetalhe;
    item.precoUnitario = this.produtoDetalhe.precoPromo;
    item.precoTotal = item.precoUnitario * item.qtdeItem;
    
    pedido.itensPedido.push(item);
    pedido.valorTotal = pedido.valorTotal + item.precoTotal;
    
    localStorage.setItem("ShoppingCart", JSON.stringify(pedido));
    this.carService.getNumberOfItens().next(pedido.itensPedido.length);

    this.nav.navigate(['/carrinho'])
  }

}
